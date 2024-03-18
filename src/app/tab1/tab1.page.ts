import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  public minutes: number = 0;
  public seconds: number = 0;
  public milliseconds: number = 0;
  public interval: any;
  public isRunning: boolean = false;

  public toogleTimer() {
    if(!this.isRunning) {
      this.isRunning = !this.isRunning
      this.startTimer();
    } else {
      this.isRunning = !this.isRunning
      this.stopTimer();
    }
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.milliseconds += 10;
      if (this.milliseconds == 1000) {
        this.milliseconds = 0;
        this.seconds++;
      }
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }, 10);
  }

  private stopTimer(): void {
    clearInterval(this.interval);
  }

// reinistialise le timer
public  resetTimer() {
    this.stopTimer();
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
  }


}
