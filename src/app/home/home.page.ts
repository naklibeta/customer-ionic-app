import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options: InAppBrowserOptions = {
    location: 'no',//Or 'no'
    hidden: 'no', //Or  'yes'
    zoom: 'no',//Android only ,shows browser zoom controls
    hideurlbar: 'yes',//Or 'no'

  };

  constructor(private iab: InAppBrowser, public alertCtrl: AlertController) {
    this.OpenWebApp();
  }


  OpenWebApp() {
    let env = this;
    const browser = this.iab.create('https://naklibeta.com/', '_self', this.options);
    browser.on('loadstop').subscribe(event => {
      browser.on('exit').subscribe(() => {
        //alert('browser has been closed');
        env.presentAlertConfirm()

      }, err => {
        alert('err' + err);
        console.error(err);
      });
    });

  }


  async presentAlertConfirm() {
    let env = this;
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: 'Exit App!',
      message: 'Are you sure, do you want to exit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            env.OpenWebApp();
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }






}
