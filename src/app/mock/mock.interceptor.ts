import { Injectable, Injector } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import * as MockServices from './services'
import { IReqestService } from 'app/core/http'
import * as qs from 'qs'

@Injectable()
export class MockHttpRequestInterceptor implements HttpInterceptor {
  public services: {
    url: string
    method: any
    callback: (...args: any[]) => any
  }[] = []

  constructor(private injector: Injector) {
    Object.values(MockServices)
      .map((x: any) => x.mockServices)
      .forEach((items: Map<IReqestService, () => any>) => {
        items.forEach((value, key) => {
          const url = [key.controller, key.action].filter(x => x).join('/')
          const method = key.method
          this.services.push({
            url,
            method,
            callback: value
          })
        })
      })
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mockService = this.services.find(
      x => request.url.includes(x.url) && request.method === x.method
    )

    if (mockService) {
      const data =
        this.getRequestParams(request) || this.getRequestBody(request)

      try {
        const body = mockService.callback(data)
        return of(new HttpResponse({ status: 200, body }))
      } catch (ex) {
        return throwError(
          new HttpErrorResponse({ status: 400, statusText: ex.message })
        )
      }
    }

    return next.handle(request)
  }

  private getRequestParams(request) {
    if (!['GET', 'DELETE'].includes(request.method)) {
      return null
    }

    return qs.parse(request.params.toString())
  }

  /**
   * 根据服务配置返回Body参数
   * @param options 请求选项
   */
  private getRequestBody(request): object {
    if (!['POST', 'PUT'].includes(request.method)) {
      return null
    }

    return request.body
  }
}
