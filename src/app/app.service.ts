import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  messages = [];
  users = [];
  path = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMessages(userId) {
    this.http.get<any>(this.path + '/posts/' + userId).subscribe(res => {
      this.messages = res;
    });
  }
  postMessage(message) {
    this.http.post<any>(this.path + '/posts', message).subscribe(res => {
      this.messages = res;
    });
  }

  listUsers() {
    this.http.get<any>(this.path + '/api/users').subscribe(res => {
      this.users = res;
    });
  }

  getUser(userid) {
    return this.http.get(this.path + `/api/users/${userid}`);
  }

  getProfile(id) {
    return this.http.get(this.path + `/profile/${id}`);
  }
}
