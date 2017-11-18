import { Component } from '@angular/core';
import { ApiService } from '../../app.service';

@Component({
  selector: 'users',
  template: `<br>
  <button (click)="post()" mat-raised-button color="primary">Create new user</button>
  <div *ngFor="let user of apiService.users">
  <mat-card [routerLink]="['/profile',user.userid]" style="cursor:pointer">{{user.firstname}} {{user.lastname}}</mat-card> 
</div>
`,
})
export class UsersComponent {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.listUsers();
  }
}
