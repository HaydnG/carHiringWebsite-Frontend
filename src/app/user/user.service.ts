import {User} from './User';
import {Injectable, Directive} from '@angular/core';

@Injectable()
export class UserService {
  private user: User;
  constructor() {
    this.user = new User();
  }

  getLoggedIn(): boolean {
    return this.user.loggedIn;
  }

  getUsername(): string {
    return this.user.username;
  }

}
