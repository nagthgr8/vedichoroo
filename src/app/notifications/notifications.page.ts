import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  rahu: boolean = false;
  rahus: boolean = false;
  rahut1: boolean = false;
  rahut2: boolean = false;
  rahut3: boolean = false;
  sunrise: boolean = false;
  sunset: boolean = false;
  transitNotify: boolean = false;
  panchangSummary: boolean = false;

  constructor(
    public shareService: ShareService,
    private horoscopeService: HoroscopeService
  ) {
    let res = this.shareService.getRAHU();
    if (res) {
      this.rahu = res;
    } else {
      this.rahu = true;
    }
    res = this.shareService.getRAHUS();
    if (res) {
      this.rahus = res;
    } else {
      this.rahus = true;
    }
    res = this.shareService.getRAHUT1();
    if (res) {
      this.rahut1 = res;
    } else {
      this.rahut1 = true;
    }
    res = this.shareService.getRAHUT2();
    if (res) {
      this.rahut2 = res;
    } else {
      this.rahut2 = true;
    }
    res = this.shareService.getRAHUT3();
    if (res) {
      this.rahut3 = res;
    } else {
      this.rahut3 = true;
    }
    res = this.shareService.getSUNR();
    if (res) {
      this.sunrise = res;
    } else {
      this.sunrise = true;
    }
    res = this.shareService.getSUNS();
    if (res) {
      this.sunset = res;
    } else {
      this.sunset = true;
    }
  }

  ngOnInit() {
  }

  public onToggle(key: string, value: boolean) {
    console.log(`onToggle(${key}, ${value})`);
    switch (key) {
      case 'rahu':
        this.shareService.setRAHU(value);
        break;
      case 'rahus':
        this.shareService.setRAHUS(value);
        break;
      case 'sunrise':
        this.shareService.setSUNR(value);
        break;
      case 'sunset':
        this.shareService.setSUNS(value);
        break;
      case 'transitNotify':
        this.shareService.setItem('transitNotify', value);
        break;
      case 'panchangSummary':
        this.shareService.setItem('panchangSummary', value);
        break;
    }

    // Prepare preferences object
    const preferences = {
      Rahu: this.rahu,
      Rahus: this.rahus,
      Sunrise: this.sunrise,
      Sunset: this.sunset,
      TransitNotify: this.transitNotify,
      PanchangSummary: this.panchangSummary
    };

    // Call the backend API to save preferences
    this.horoscopeService.setNotificationPreferences(preferences).subscribe({
      next: (res) => {
        console.log('Notification preferences updated:', res);
      },
      error: (err) => {
        console.error('Failed to update notification preferences:', err);
      }
    });
  }
}