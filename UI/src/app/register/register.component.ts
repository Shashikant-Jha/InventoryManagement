import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.userService.register(payload).subscribe(
      (res) => {
        console.log(res);
        alert('Registered successfully');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        alert('Username unavailable');
        this.username = '';
        this.email = '';
        this.password = '';
      }
    )
  }
}
