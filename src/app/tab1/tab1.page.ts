import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { Vehicule } from '../models/vehicule';
import { User } from '../models/person';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public monVehicule:Vehicule =new Vehicule();

  public pierre:User =new User();

  public coordinates:any;

  public accelHandler!: PluginListenerHandle;

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


public async printCurrentPosition() {
  this.coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', this.coordinates);
}
// compass data
public async data() {
  this.accelHandler = await Motion.addListener('accel', event => {
    console.log('Device motion event:', event);
  });
}
public test1(message:string){
 this.monVehicule.anneeConstruit=2001;
this.pierre.Nom="Bourguigneau"
this.pierre.sex="enorme"
this.monVehicule.carburant="mazout"
this.monVehicule.moteur="W16"
this.pierre.vehicule=this.monVehicule;
  console.log(this.pierre)
}
}