import { Component, OnInit, Input } from '@angular/core'
import { NavController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input()
  public color = 'black'
  @Input()
  public modal = false

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  public ngOnInit() {
    return
  }

  public onClick() {
    if (this.modal) {
      this.modalController.dismiss()
    }
    this.navCtrl.back()
  }
}
