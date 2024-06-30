import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DeckListComponent,
    DeckDetailComponent,
    DeckFormComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ]
})
export class LayoutModule { }
