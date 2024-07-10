import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../interfaces/card';
import { DeckService } from '../services/deck-service';
import { Deck } from '../interfaces/deck';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss']
})
export class DeckFormComponent implements OnInit {
  deck: Deck = { id: 0, name: '', cards: [] as Card[] };
  allCards: Card[] = [];
  cardName: string = '';
  cardCount: number = 1;
  isEditMode: boolean = false;
  largeImageUrl: string = '';
  showAlert: boolean = false;
  message: string = '';

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const deckId = +this.route.snapshot.paramMap.get('id')!;
    if (deckId) {
      const deck = this.deckService.getDeckById(deckId);
      if (deck) {
        this.deck = { ...deck };
        this.isEditMode = true;
      }
    }

    this.deckService.getCards().subscribe(response => {
      this.allCards = response.cards;
    });
  }

  addCard() {
    const card = this.allCards.find(c => c.name === this.cardName);
    if (card == null || card == undefined) {
      this.message = 'Selecione uma carta'
      this.showConfirmation();
      return;
    }
    if (card && this.deck.cards.filter(c => c.name === this.cardName).length < 4) {
      this.deck.cards.push(card);
      this.cardName = '';
      return;
    }
    else {
      this.message = 'O Deck pode conter no máximo 4 cartas com o mesmo nome.'
      this.showConfirmation();
    }
  }

  removeCard(index: number) {
    this.deck.cards.splice(index, 1);
  }

  showConfirmation() {
    this.showAlert = true;
  }

  hideConfirmation() {
    this.showAlert = false;
  }

  saveDeck() {
    if (this.deck.cards.length < 24 || this.deck.cards.length > 60) {
      this.message = 'O Deck deve ter entre 24 e 60 cartas.'
      this.showConfirmation();
      return;
    }
    if (this.deck.name == null || this.deck.name == "") {
      this.message = 'Escolha um nome para o Deck'
      this.showConfirmation();
      return;
    }
    if (this.isEditMode) {
      this.deckService.updateDeck(this.deck);
      this.router.navigate(['/']);
    } else {
      this.deckService.addDeck(this.deck);
      this.router.navigate(['/']);
    }
  }

  showImage(url: string) {
    this.largeImageUrl = url;
    document.querySelector('.overlay')?.classList.add('active');
  }

  hideImage() {
    this.largeImageUrl = '';
    document.querySelector('.overlay')?.classList.remove('active');
  }
}
