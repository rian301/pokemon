import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { LayoutComponent } from './layout/layout.component';
import { DeckListComponent } from './deck-list/deck-list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: DeckListComponent },
    { path: 'deck/:id', component: DeckDetailComponent },
    { path: 'create-deck', component: DeckFormComponent },
    { path: 'edit-deck/:id', component: DeckFormComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
