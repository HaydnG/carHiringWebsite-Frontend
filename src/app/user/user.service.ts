import {User} from './User';
import {Injectable, Directive} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class UserService {
  private url = 'http://localhost:8080/userService/';

  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {}

  Login(email: string, password: string): void {
    this.http.get<User>(this.url + 'login?email=' + email + '&password=' + password).subscribe(data => {
      this.userChange.next(data);
      console.log(data);
    });
  }

}
