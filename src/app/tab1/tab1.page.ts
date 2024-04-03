import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { Vehicule } from '../models/vehicule';
import { User } from '../models/person';
import { NgLocalization } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public monVehicule:Vehicule =new Vehicule();

  public pierre:User =new User();

  public coordinatesStart:any;

  public accelHandler!: PluginListenerHandle;

  constructor(private geolocation: Geolocation) { }

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
  this.coordinatesStart = await Geolocation.getCurrentPosition();
  console.log('Current position:', this.coordinatesStart.coords.latitude);
  this.calculateDistance(this.coordinatesStart.coords.latitude,this.coordinatesStart.coords.longitude,43.48333,-1.48333)
  let watch = navigator.geolocation.watchPosition(this.successCallback)

}

public successCallback(position:any) {
  console.log('watch', position);
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
private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Rayon de la Terre en mètres
  const phi1 = lat1 * Math.PI / 180; // φ, λ en radians
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2-lat1) * Math.PI / 180;
  const deltaLambda = (lon2-lon1) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = R * c; // en mètres
  console.log(distance);
}

}