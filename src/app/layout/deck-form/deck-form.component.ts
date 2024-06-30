import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../interfaces/card';
import { DeckService } from '../../services/deck/deck-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss']
})
export class DeckFormComponent implements OnInit {
  deck = { id: 0, name: '', cards: [] as Card[], uid: '', userId: '' };
  allCards: Card[] = [];
  cardName = '';
  cardCount = 1;
  isEditMode = false;
  largeImageUrl: string = '';
  showAlert = false;
  message: string = '';

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const deckId = +this.route.snapshot.paramMap.get('id')!;
    if (deckId) {
      this.deckService.getDeckById(deckId)
      .pipe(take(1)).subscribe(res => {
        if (res) {
          this.deck = res;
          this.isEditMode = true;
        }
      });
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

  async saveDeck() {
    if (this.deck.cards.length < 2 || this.deck.cards.length > 60) {
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
      await this.deckService.updateDeck(this.deck, this.deck?.uid);
      this.router.navigate(['/layout']);
    } else {
      await this.deckService.addDeck(this.deck);
      this.router.navigate(['/layout']);
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
