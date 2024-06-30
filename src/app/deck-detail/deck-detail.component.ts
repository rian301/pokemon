import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from '../interfaces/deck';
import { DeckService } from '../services/deck-service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {
  deck: Deck | undefined;
  uniqueTypes: number = 0;
  superTypes: number = 0;
  showAlert = false;
  confirmId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    this.getDeck();
  }

  getDeck(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deck = this.deckService.getDeckById(Number(id));
      if (this.deck) {
        this.calculateUniqueTypes();
        this.calculateSuperTypes();
      } else {
        // Tratamento caso não encontre o deck com o ID fornecido
      }
    }
  }

  calculateUniqueTypes(): void {
    if (this.deck) {
      const typesSet = new Set<string>();
      this.deck.cards.forEach(card => {
        if (card.types) {
          card.types.forEach(type => typesSet.add(type));
        }
      });
      this.uniqueTypes = typesSet.size;
    }
  }

  calculateSuperTypes(): void {
    if (this.deck) {
      const superTypesSet = new Set<string>();
      this.deck.cards.forEach(card => {
        if (card.supertype) {
          superTypesSet.add(card.supertype);
        }
      });
      this.superTypes = superTypesSet.size;
    }
  }

  back(){
    this.router.navigate(['/'])
  }

  editDeck(id: number) {
    this.router.navigate([`/edit-deck/${id}`])
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
   this.router.navigate(['/'])
 }
}
