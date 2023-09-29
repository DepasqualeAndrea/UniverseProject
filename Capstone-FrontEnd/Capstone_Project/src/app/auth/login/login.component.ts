import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  register: boolean = false;
  isLoading = false;
  login = false;
  loginPage = true;
  registrazioneOk = false;

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  password: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  changeToLogin() {
    this.register = false;
  }

  changeToSignup() {
    this.register = true;
  }

  registra(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('nome', form.value.nome);
    formData.append('cognome', form.value.cognome);
    formData.append('username', form.value.username);
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);

    this.http.post('http://localhost:3001/auth/register', formData).subscribe(
      (response) => {
        if (response) {
          this.loginPage = false
          this.registrazioneOk = true
          setTimeout(() => {
            this.loginPage = true
            this.registrazioneOk = false
            this.register = false
            this.loginPage = true
            this.router.navigate(['/login']);
          }, 5000);
          console.log('Registrazione riuscita', response);
        }
      },
      (error) => {
        console.error('Errore durante la registrazione', error);
        this.isLoading = false;
      }
    );
  }

  Accedi(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = this.authService.getToken();
        console.log('Token:', token)
        this.loginPage = false
        this.login = true;


        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 4000);
      },
      (error) => {
        this.isLoading = false;
        alert('⛔ Credenziali non valide. Verifica che le credenziali di accesso siano corrette e riprova ad effettuare l\'accesso.');
        console.error('Errore di login:', error);
      }
    );
  }



}
