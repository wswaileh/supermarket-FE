import { Injectable } from '@angular/core';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  private _userLoggedIn: User = null;

  private _isUserLoggedInSubject: BehaviorSubject<boolean>;

  private _isAdmin = false;

  set userLoggedin(user: User) {
    this._userLoggedIn = user;
  }

  get userLoggedin(): User {
    return this._userLoggedIn;
  }

  constructor() {
    this.users.push(
      {
        username: "admin",
        password: "8080",
        isAdmin: true
      },
      {
        username: "user",
        password: "user",
        isAdmin: false
      }
    )

    if (localStorage.getItem('isAdmin') != null && localStorage.getItem('isAdmin') == 'true') {
      this._userLoggedIn = this.users[0];
      this._isAdmin = this.users[0].isAdmin;
      this._isUserLoggedInSubject = new BehaviorSubject<boolean>(true);
    }
    else if (localStorage.getItem('isAdmin') != null && localStorage.getItem('isAdmin') == 'false'){
      this._userLoggedIn = this.users[1];
      this._isAdmin = this.users[1].isAdmin;
      this._isUserLoggedInSubject = new BehaviorSubject<boolean>(true);
    }
    else
      this._isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  }

  login(logginInuser: User): boolean {
    let possibleUsers = this.users.filter((user) => user.username.toLowerCase() == logginInuser.username.toLowerCase());
    if (possibleUsers.length == 0) {
      return false;
    }
    else {
      if (possibleUsers[0].password == logginInuser.password) {
        this._userLoggedIn = possibleUsers[0];
        this._isAdmin = possibleUsers[0].isAdmin;
        this._isUserLoggedInSubject.next(true);
        localStorage.setItem('isAdmin', this.isAdmin + '');
        return true;
      }
      else {
        return false;
      }
    }
  }

  isUserLoggedIn() {
    return this._isUserLoggedInSubject.asObservable();
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  logout() {
    this._userLoggedIn = null;
    localStorage.removeItem('isAdmin');
    this._isUserLoggedInSubject.next(false);
  }

}
