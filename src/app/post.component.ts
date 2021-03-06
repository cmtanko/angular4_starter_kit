import { Component } from '@angular/core';
import { ApiService } from './app.service';

@Component({
  selector: 'post',
  template: `<mat-card>
  <mat-card-header>
      <mat-card-title>
          <h4>New Post</h4>
      </mat-card-title>
  </mat-card-header>
  <mat-card-content>
      <form>
          <mat-input-container style="width:100%">
              <input [(ngModel)]="postMsg" name="description" matInput placeholder="Post Message" type="testarea">
          </mat-input-container>
          <br>
          <button (click)="post()" mat-raised-button color="primary">Post</button>
      </form>
  </mat-card-content>
</mat-card>`,
})
export class PostComponent {
  constructor(private apiService: ApiService) {}
  postMsg = '';

  post() {
    this.apiService.postMessage({ msg: this.postMsg });
  }
}
