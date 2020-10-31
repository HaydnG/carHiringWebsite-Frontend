import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <a style="padding-bottom: 10px">Need an account? Register</a>
    <div style="display: flex;flex-wrap:wrap">


      <div style="width: 80%;justify-content: space-evenly">
        <input [id]="username" class="auth" placeholder="Username">
        <input [id]="password" class="auth" placeholder="Password" type="password">
      </div>
      <div style="align-self: center; margin: 0 auto;">
        <a >Login</a>
     </div>

    </div>
`,
  styles: [`
  :host {
      width: 25%;
  }

  .center{
    left: 50%;
  }
  .auth{
  ;
    margin: 5px 5px 5px 0px;
    width: 45%;
    height: 20px;
    min-width: 80px;
    max-width: 160px;
  }

  .spacer {
    flex-grow: 1;
  }
  `]
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  constructor() { }

  ngOnInit(): void {
  }

}
