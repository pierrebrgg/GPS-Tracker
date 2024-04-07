import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { Vehicule } from '../models/vehicule';
import { User } from '../models/person';
import { Observable, Subject, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public monVehicule:Vehicule =new Vehicule();

  public pierre:User =new User();

  public successivePositions: string[] = []
  public frequenceCurrentPosition$: Subject<boolean> = new Subject()
  public distanceSuccessive: number[] = [];

  public distance: number = 0;

  public coordinatesStart:any;

  public accelHandler!: PluginListenerHandle;

  constructor(private geolocation: Geolocation) { }

  public minutes: number = 0;
  public seconds: number = 0;
  public milliseconds: number = 0;
  public interval: any;
  public isRunning: boolean = false;

  public async ngOnInit(): Promise<void> {
    this.coordinatesStart = await Geolocation.getCurrentPosition();
  }

  public toogleTimer() {
    if(!this.isRunning) {
      this.isRunning = !this.isRunning
      this.frequenceCurrentPosition$ = new Subject();
      this.startTimer();

    } else {
      this.frequenceCurrentPosition$.next(true);
      this.frequenceCurrentPosition$.complete();
      this.frequenceCurrentPosition$.unsubscribe()
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
    this.successivePositions = [];
    this.distanceSuccessive = []
  }


public printCurrentPosition() {
  // interval de temps en milliseconde ici 3000 = 3s
  timer(0, 3000).pipe(takeUntil(this.frequenceCurrentPosition$)).subscribe(async () => {
    let currentPosition = await Geolocation.getCurrentPosition();
      console.log(currentPosition.coords)
      this.distanceSuccessive.unshift(this.calculateDistance(this.coordinatesStart.coords.latitude,this.coordinatesStart.coords.longitude,
        currentPosition.coords.latitude,currentPosition.coords.longitude));
      this.distance = this.calculateDistance(this.coordinatesStart.coords.latitude,this.coordinatesStart.coords.longitude,
          currentPosition.coords.latitude,currentPosition.coords.longitude);
      this.successivePositions.unshift(`${currentPosition.coords.latitude} - ${currentPosition.coords.longitude}`);
  });
}

// compass data
public async data() {
  this.accelHandler = await Motion.addListener('accel', (event:any) => {
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
private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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
  return distance;
}

}