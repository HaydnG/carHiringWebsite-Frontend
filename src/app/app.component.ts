import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Frontend';

  constructor(private elementRef: ElementRef) {}


  ngAfterViewInit(): void{
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#373E40';
  }
}
