import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck-service';
import { Deck } from '../interfaces/deck';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {
  decks$: Observable<Deck[]>;
  showAlert: boolean = false;
  confirmId: number | null = null;
  deckName: string;
  message: string;

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    // this.deckService.createMockDecks();
    this.decks$ = this.deckService.getDecks();
  }

  showConfirmation(id: number) {
    this.showAlert = true;
    this.confirmId = id;
  }

  hideConfirmation() {
    this.showAlert = false;
    this.confirmId = null;
  }

  deleteDeck(id: number) {
    this.deckService.removeDeck(id);
    this.hideConfirmation();
  }
}
