import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from './auth.service';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button id="googleBtn">Google Sign-In</button>',
})
export class GoogleSigninComponent implements AfterViewInit {
  private clientId: string = '566361208814-e27kv3hfodv54rpmvaj8hga0iph1euua.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
  ].join(' ');

  public auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope,
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    console.log(element);
    this.auth2.attachClickHandler(
      element,
      {},
      googleUser => {
        let access_token = googleUser.Zi.access_token;
        this.authService.googleLoginUser({access_token});
        // console.log(access_token);
        // let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
      },
      function(error) {
        console.log(JSON.stringify(error, undefined, 2));
      }
    );
  }

  constructor(private element: ElementRef, private authService: AuthService) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
