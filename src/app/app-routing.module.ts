import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { DeckFormComponent } from './deck-form/deck-form.component';

const routes: Routes = [
  { path: '', component: DeckListComponent },
  { path: 'deck/:id', component: DeckDetailComponent },
  { path: 'create-deck', component: DeckFormComponent },
  { path: 'edit-deck/:id', component: DeckFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
