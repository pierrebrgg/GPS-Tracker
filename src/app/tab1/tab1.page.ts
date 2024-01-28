import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  public compt = 0;
  public isrunnig = false;


  public increment() {
  }
  public running() {
    this.isrunnig=true
  }
  public stop() {
    this.isrunnig=false
  }


}
