import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  SPINNER: SPINNER;
  fgsType: any;
  constructor() {}

  ngOnInit() {
    this.fgsType = SPINNER.squareLoader;
  }
}
