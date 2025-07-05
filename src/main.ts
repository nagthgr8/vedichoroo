import 'core-js';
import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const firebaseConfig = {
    apiKey: 'REMOVED',
    authDomain: 'astrology-e9e07.firebase.com',
    projectId: 'astrology-e9e07',
    storageBucket: 'gs://e9e07.appspot.com',
    messagingSenderId: '242286730499',
    appId: '1:242286730499:android:2f30c2e339a0b7ae'
};
const app = initializeApp(firebaseConfig);