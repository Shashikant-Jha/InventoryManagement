import { Component, OnInit } from '@angular/core';
import { APPCONSTANTS } from '../constants/appConstants';
import { UserService } from '../services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constants = APPCONSTANTS;
  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  login() {
    this.userService.login(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        const loginresponse = res;
        if (loginresponse['message'] === 'authenticated') {
          this.constants.USER_LOGGED_IN = true;
          this.router.navigate(['/products']);
        } else {
          alert('Invalid credentials');
          this.username = '';
          this.password = '';
        }
      },
      (err) => {
        console.log(err);
        alert('Invalid credentials');
        this.username = '';
        this.password = '';
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

}
