import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';

@Injectable()
export class AuthService {
  messages = [];
  path = 'http://localhost:3000/auth';
  TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private router: Router
  ) {}

  initAuth() {
    hello.init(
      {
        msft: {
          id: '58184461-c320-46f0-99a0-56f9ae31f0da',
          oauth: {
            version: 2,
            auth:
              'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
          },
          scope_delim: ' ',
          form: false,
        },
      },
      { redirect_uri: 'http://localhost:4200/'}
    );
  }

  alogin() {
    hello('msft')
      .login({ scope: 'User.Read' })
      .then(
        data => {
          console.log('asdfadfadf' + JSON.stringify(data));
          this.zone.run(() => {
            this.router.navigate(['/login']);
          });
        },
        e => console.error(e.error.message)
      );
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  registerUser(registerData) {
    this.http
      .post<any>(this.path + '/register', registerData)
      .subscribe(res => {
        this.saveToken(res.token);
      });
  }

  loginUser(loginData) {
    this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
      this.saveToken(res.token);
    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  googleLoginUser(loginData) {
    this.http.post<any>(this.path + '/glogin', loginData).subscribe(res => {
      this.saveToken(res.token);
    });
  }
}
