import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@app/shared/shared.module'
import { RoutesRoutingModule } from './routes-routing.module'
import { RoutesComponent } from './routes.component'

@NgModule({
  declarations: [RoutesComponent],
  imports: [CommonModule, SharedModule, RoutesRoutingModule]
})
export class RoutesModule {}
