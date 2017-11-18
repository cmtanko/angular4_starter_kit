import { Component } from '@angular/core';
import { ApiService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  template: `
  <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h4>Profile</h4>
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <mat-list>
            <mat-list-item>
                Name: {{profile?.firstname}} {{profile?.lastname}}
            </mat-list-item>
            <mat-list-item>
            Email: {{profile?.email}}
        </mat-list-item>
        <mat-list-item>
        Active: {{profile?.active}}
    </mat-list-item>
    <mat-list-item>
    Address: {{profile?.address1}},{{profile?.address2}} -{{profile?.district}}
</mat-list-item>
        </mat-list>
     </mat-card-content>
  </mat-card>
  `,
})
export class ProfileComponent {
  loginData = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  profile = {};
  ngOnInit() {
    var id = this.route.snapshot.params.id;
    console.log(id);
    this.apiService
      .getUser(id)
      .subscribe(profile => (this.profile = profile[0]));
  }
}
