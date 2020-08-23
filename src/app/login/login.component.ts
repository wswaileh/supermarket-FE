import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private _userService: UserService, private router: Router,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.user = {
      username:"",
      password:"",
      isAdmin: false,
    }
  }

  login(){
    if (this._userService.login(this.user) == true){
      this.router.navigate(['/home']);
      this._toastr.success("تم الدخول بنجاح!");
    }
    else{
      this._toastr.error("برجى التاكد من معلومات الدخول!");
    }
  }

}
