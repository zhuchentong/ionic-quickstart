import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { MockHttpRequestInterceptor } from './mock.interceptor'

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class MockModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MockModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockHttpRequestInterceptor,
          multi: true
        }
      ]
    }
  }
}
