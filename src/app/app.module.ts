import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckService } from './services/deck/deck.service';
import { AngularFireModule } from "@angular/fire/compat";

const firebaseConfig = {
  apiKey: "AIzaSyDAxGIB3vSYa54nDmmOEd-uWkiAfDLYfK0",
  authDomain: "pokemon-2305d.firebaseapp.com",
  projectId: "pokemon-2305d",
  storageBucket: "pokemon-2305d.appspot.com",
  messagingSenderId: "782993807202",
  appId: "1:782993807202:web:6fa35e77117d56a4b07e3b",
  measurementId: "G-S5FWNN98BB"
};

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
