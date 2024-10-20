import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map((user) => !!user));
  }

  async logout() {
    await this.fireAuth.signOut();
  }
}
