import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BackButtonComponent } from './components/back-button/back-button.component'
import { EmptyComponent } from './components/empty/empty.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { DictPipe } from './pipes/dict.pipe'

const COMPONENTS = [BackButtonComponent, EmptyComponent]
const DIRECTIVES = []
const PIPES = [DictPipe]

const BASE_MODULE = [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]

@NgModule({
  entryComponents: [...COMPONENTS],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...BASE_MODULE],
  exports: [...BASE_MODULE, ...COMPONENTS, ...DIRECTIVES, ...PIPES]
})
export class SharedModule {}
