import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from './auth.service';
declare const gapi: any;

@Component({
  selector: 'microsoft-signin',
  template: '<button id="googleBtn" (click)="onLogin()">Microsoft Sign-In</button>',
})
export class MircrosoftSigninComponent {
  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.alogin();
  }
}
