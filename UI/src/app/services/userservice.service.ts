import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APPCONSTANTS } from '../constants/appConstants';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constants = APPCONSTANTS;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(usrname, pwd) {
    const payload = {
      username: usrname,
      password: pwd
    };
    return this.httpClient.post('http://localhost:5001/api/Accounts/login', payload);
  }

  logout() {
    this.constants.USER_LOGGED_IN = false;
    this.router.navigate(['/login']);
  }

  register(payload) {
    return this.httpClient.post('http://localhost:5001/api/Accounts/register', payload);
  }
}
