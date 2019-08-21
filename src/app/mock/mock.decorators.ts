import { IReqestService } from 'app/core/http'

export function MockService({ service }: { service: IReqestService }) {
  return (target, name, descriptor) => {
    if (!target['mockServices']) {
      target['mockServices'] = new Map()
    }

    const services = target['mockServices'] as Map<IReqestService, any>
    services.set(service, descriptor.value)

    return descriptor
  }
}
