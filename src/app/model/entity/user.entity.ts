import { Type, Expose } from 'class-transformer'
import { Entity } from '@model/entity'

export class UserEntity extends Entity {
  @Expose()
  public id: string

  @Expose()
  public username: string
}
