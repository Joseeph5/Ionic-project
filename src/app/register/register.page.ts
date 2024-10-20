import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  async register() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
}
