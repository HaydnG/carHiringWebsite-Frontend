import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
    <div class="row">
      <app-navbar></app-navbar>
    </div>
    <div class="row">
      <div class="search">
        <input ngbAutofocus id="search" class="form-control" placeholder="Search" formControlName="search">
      </div>
    </div>`,
  styles: [`
  .search{
    top: 76px;
    left: 0px;
    background-color: white;
    color: black;
    width: 100%;
    height: 84px;
    position: absolute;
    text-align: center;
    font-size: 37px;
 }`]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
