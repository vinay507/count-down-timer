import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  private targetDate: Date = new Date('2024-09-31T23:59:59'); 
  private subscription: Subscription | null = null;

  constructor() { }

  ngOnInit() {
    this.calculateTime();
    this.subscription = interval(1000).subscribe(() => this.calculateTime());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateTime() {
    const currentTime = new Date().getTime();
    const targetTime = this.targetDate.getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference > 0) {
      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    } else {
      this.days = this.hours = this.minutes = this.seconds = 0;
    }
  }
}