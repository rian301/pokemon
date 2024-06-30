import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth";
import { localStorageKeys } from 'src/app/enums/localstorage.enum';
import { UserInfo } from 'src/app/interfaces/user-info';
import { DeckService } from '../deck/deck.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private afAuth: AngularFireAuth,
  private router: Router,
  private deckService: DeckService) { }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        this.getCredentialsAndSetToken(userCredential);
      })
      .catch((error) => {
        alert('Não foi possível realizar o login.')
      });
  }

  private async getCredentialsAndSetToken(userCredential: any) {
    const { additionalUserInfo } = userCredential;
    const firebaseUser = userCredential.user?.multiFactor?.user;
      const user = {
        id: firebaseUser?.uid,
        email: firebaseUser?.email,
        accessToken: firebaseUser?.accessToken,
      }
      this.setToken(user);
      if (additionalUserInfo?.isNewUser) {
        await this.deckService.createMockDecks();
      }
      this.goToHome();
  }

  private setToken(user: UserInfo) {
    localStorage.setItem(localStorageKeys['user'], JSON.stringify(user));
  }

  private goToHome() {
    this.router.navigate(['/layout']);
  }

  async validateToken(): Promise<boolean> {
    const token = await firstValueFrom(this.afAuth.idToken)
    if (token) return true;

    this.router.navigate(['/login']);
    return false;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.removeToken();
      this.router.navigate(['/auth']);
    }).catch((error) => {
      console.log(error)
    });
  }

  removeToken() {
    localStorage.removeItem(localStorageKeys['user']);
  }
}
