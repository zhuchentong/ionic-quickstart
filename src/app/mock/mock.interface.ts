import { IReqestService } from 'app/core/http'

export interface IMockInterface {
  onMockService(): { service: IReqestService; data: any }[]
}
