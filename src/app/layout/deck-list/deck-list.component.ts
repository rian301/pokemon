import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck-service';
import { Deck } from '../../interfaces/deck';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {
  decks$: Observable<Deck[]>;
  showAlert: boolean = false;
  confirmId: null | string = null;
  deckName: string;
  message: string;

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.decks$ = this.deckService.getDecks();
  }

  showConfirmation(id: string) {
    this.showAlert = true;
    this.confirmId = id;
  }

  hideConfirmation() {
    this.showAlert = false;
    this.confirmId = null;
  }

  async deleteDeck(uid: string) {
    await this.deckService.removeDeck(uid);
    this.hideConfirmation();
  }
}
