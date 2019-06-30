import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(usrname, pwd) {
    const payload = {
      username: usrname,
      password: pwd
    };
    return this.httpClient.post('http://localhost:5001/api/Accounts/login', payload);
  }
}
