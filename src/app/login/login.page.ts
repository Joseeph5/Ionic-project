import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  async login() {
    try {
      await this.fireAuth.signInWithEmailAndPassword(this.email, this.password);
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
