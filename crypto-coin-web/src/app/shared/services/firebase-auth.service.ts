import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
    userData: Observable<firebase.default.User>;

    private MESSAGE_ERROR = {
        'auth/email-already-in-use': 'Email já em uso',
        'auth/wrong-password': 'Email ou senha inválidos',
        'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.'
    }

    constructor(private firebaseAuth: AngularFireAuth) {
        this.userData = firebaseAuth.authState;
    }

    public async signUp(email: string, password: string) {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => res)
            .catch(error => { throw this.getError(error.code) });
    }

    public async signIn(email: string, password: string) {
        return this.firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => res)
            .catch(error => { throw this.getError(error.code) });
    }

    public async signOut(): Promise<void> {
        this.firebaseAuth.signOut();
    }

    public async resetPass(email: string) {
        await this.firebaseAuth.sendPasswordResetEmail(email)
            .then(res => res)
            .catch(error => { throw this.getError(error.code) });
    }

    private getError(code: string) {
        return { message: this.MESSAGE_ERROR[code] };
    }
}
