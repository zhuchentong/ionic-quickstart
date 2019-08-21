import { Injectable, Injector } from '@angular/core'
import { Router } from '@angular/router'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpClient
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 默认HTTP拦截器
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private async toast(msg, title = '') {
    // const toastController = this.injector.get(ToastController)
    // const toast = await toastController.create({
    //   header: title,
    //   message: msg,
    //   position: 'top',
    //   duration: 2000
    // })
    // toast.present()
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url))
  }

  private checkStatus(ev: HttpResponseBase) {
    let errortext = ''

    if (ev.status >= 200 && ev.status < 300) return

    if (ev.status === 400) {
      errortext = ev.statusText
      return this.toast(`请求错误:${errortext}`)
    }
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    this.checkStatus(ev)
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        break
      case 400:
        return throwError(ev)
        break
      case 401: // 未登录状态码
      case 403:
      case 404:
      case 500:
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev)
          return throwError(ev)
        }
        break
    }
    return of(ev)
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) return this.handleData(event)
        // 若一切都正常，则后续操作
        return of(event)
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    )
  }
}
