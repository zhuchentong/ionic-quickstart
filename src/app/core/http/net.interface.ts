import { PageService } from '@core/http'
import { Entity } from '@model/entity'

export interface IReqestService {
  version?: string
  service?: string
  controller?: string
  action?: string
  method: string
}

export interface IRequestOption {
  service: IReqestService
  append?: string[]
  loading?: boolean | string
  entity?: new () => Entity
  params?: any
  page?: PageService
}
