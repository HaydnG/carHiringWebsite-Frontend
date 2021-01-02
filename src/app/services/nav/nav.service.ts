import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class NavService {


 private navigationQueue: NavItem[] = [];


  constructor(private http: HttpClient,  private router: Router) {}



  Add(url: string, id: number): void{
    this.navigationQueue.push(new NavItem(url, id));
    console.log(this.navigationQueue);
  }

  Navigate(current: string, currentID: number, command: any[]): void{
    this.Add(current, currentID);

    this.router.navigate(command);
  }

  Back(def: string): void{
    const navItem = this.navigationQueue.pop();
    if (navItem === undefined){
      this.router.navigate([def]);
    }else{
      if (navItem.id === 0){
        this.router.navigate([navItem.url]);
      }else {
        this.router.navigate([navItem.url, {id: navItem.id}]);
      }

    }
    console.log(this.navigationQueue);
  }

  Reset(): void{
    this.navigationQueue = [];
  }

}


export class NavItem{
  url: string;
  id: number;

  constructor(url: string, id: number) {
    this.url = url;
    this.id = id;
  }

}
