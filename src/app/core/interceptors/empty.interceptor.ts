import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Store } from '@ngxs/store'

@Injectable()
export class EmptyInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let params

    for (const key of request.params.keys()) {
      const value = request.params.get(key)
      if (
        value === '' ||
        value === undefined ||
        value === null ||
        value === 'undefined'
      ) {
        params = params || request.params
        params = params.delete(key)
      }
    }

    if (params) {
      request = request.clone({
        params
      })
    }

    return next.handle(request)
  }
}
