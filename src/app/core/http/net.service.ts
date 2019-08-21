import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, finalize } from 'rxjs/operators'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { classToPlain, plainToClass } from 'class-transformer'
import { PageService, IRequestOption, IReqestService } from '@core/http'
import { environment } from '@env/environment'
import { DTO } from '@model/dto'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root'
})
export class NetService {
  // 请求头部信息
  private headers = new HttpHeaders()

  constructor(private http: HttpClient) {}

  /**
   * 根据服务配置生成通讯地地址
   * @param options 请求选项
   */
  public static generateRequestUrl(options: IReqestService, append: string[] = []): string {
    return [environment.SERVER_URL, options.version, options.service, options.controller, options.action, ...append]
      .filter(x => x)
      .join('/')
  }

  /**
   * 发送网络通讯请求
   * @param options 请求选项
   */
  public send(options: IRequestOption): Observable<any> {
    // 生成请求URL
    const requestUrl: string = NetService.generateRequestUrl(options.service, options.append)
    // 生成请求METHOD
    const requestMethod: string = options.service.method

    this.generateRequestLoading(options)
    return this.http
      .request(requestMethod, requestUrl, {
        body: this.generateRequestBody(options),
        headers: this.generateRequestHeader(options),
        observe: 'response',
        responseType: 'json',
        params: this.generateRequestParams(options)
      })
      .pipe(
        // 取body数据
        map(response => {
          const body = response.body as any

          if (!body.isSuccess) {
            throw new Error('请求失败')
          }

          // 返回数据
          let data = body.data

          // 更新分页数据
          if (this.isPagingData(data)) {
            const { list = [], total = 0 } = data
            console.log(list, total)
            options.page && options.page.update(total)
            data = list
          }

          return options.entity ? plainToClass(options.entity, data) : data
        }),
        finalize(() => {})
      )
  }

  /**
   * 根据服务配置返回Search参数
   * @param options 请求选项
   */
  private generateRequestParams(options): HttpParams {
    if (!['GET', 'DELETE'].includes(options.service.method)) {
      return null
    }

    // TODO:分页处理
    let params = options.params

    if (params instanceof DTO) {
      params = classToPlain(params, { excludeExtraneousValues: true })
    }

    if (options.page) {
      params = Object.assign(params || {}, this.getPageParams(options.page))
    }

    return new HttpParams({
      fromString: qs.stringify(params)
    })
  }

  /**
   * 根据服务配置返回Body参数
   * @param options 请求选项
   */
  private generateRequestBody(options): object {
    if (!['POST', 'PUT'].includes(options.service.method)) {
      return null
    }

    let params = options.params

    // 如果参数继承Model
    if (params instanceof DTO) {
      params = classToPlain(params, { excludeExtraneousValues: true })
    }

    if (options.page) {
      params = Object.assign(params, this.getPageParams(options.page))
    }

    return params
  }

  private getPageParams(page: PageService) {
    return page.getConfig()
  }

  /**
   * 生成头部信息
   */
  private generateRequestHeader(options): HttpHeaders {
    // TODO:自定义header
    return this.headers
  }

  /**
   * 生成请求实的Loading
   * @param options 请求选项
   */
  private generateRequestLoading(options): any {
    if (!options || !options.loading) {
      return
    }
  }

  private isPagingData(data) {
    return data && data.pageSize && data.pageNum && data.list
  }
}
