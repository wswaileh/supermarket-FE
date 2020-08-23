import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Al-Malki';

  isAdmin = false;
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(){
    this.userService.isUserLoggedIn().subscribe( (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
      this.isAdmin = this.userService.isAdmin;
    })
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/']);
  }
  

  


}
