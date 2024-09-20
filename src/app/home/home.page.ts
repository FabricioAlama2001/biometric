import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
const { Fingerprint } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;
  isPwd = false;
  isToast = false;
  toastMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePwd() {
    this.isPwd = !this.isPwd;
  }

  onSubmit() {
    if (this.form.valid) {
      this.toastMessage = 'Login Successful';
    } else {
      this.toastMessage = 'Invalid Form';
    }
    this.isToast = true;
  }

  async performBiometricVerification() {
    try {
      const result = await Fingerprint['show']({
        reason: 'Por favor autentícate',
        fallbackTitle: 'Usar Contraseña',
        disableBackup: false,
      });
      console.log('Autenticación exitosa', result);
      this.toastMessage = 'Autenticación biométrica exitosa';
    } catch (error) {
      console.error('Autenticación fallida', error);
      this.toastMessage = 'Autenticación biométrica fallida';
    }
    this.isToast = true;
  }

  deleteCredentials() {
    console.log('Borrar credenciales');
    this.toastMessage = 'Credenciales borradas';
    this.isToast = true;
  }
}
