import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { DeckService } from './services/deck-service';
import { ConfirmationAlertComponent } from './shared/components/confirmation/confirmation-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckFormComponent,
    ConfirmationAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // IgxButtonModule
  ],
  providers: [DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
