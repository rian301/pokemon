import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from '../../interfaces/deck';
import { DeckService } from '../../services/deck/deck.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {
  deck: Deck;
  uniqueTypes: number = 0;
  superTypes: number = 0;
  showAlert: boolean = false;
  confirmId: number | null = null;
  message: string = "Tem certeza que deseja apagar o Deck?";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) {}

  ngOnInit() {
    this.getDeck();
  }

  getDeck() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deckService.getDeckById(Number(id))
      .pipe(take(1)).subscribe(res => this.deck = res);
      if (this.deck) {
        this.calculateUniqueTypes();
        this.calculateSuperTypes();
      } else {
        // Tratamento caso não encontre o deck com o ID fornecido
      }
    }
  }

  calculateUniqueTypes() {
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

  calculateSuperTypes() {
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
    this.router.navigate(['/layout'])
  }

  editDeck(id: number) {
    this.router.navigate([`/layout/edit-deck/${id}`])
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
  //  this.deckService.removeDeck(id);
  //  this.hideConfirmation();
  //  this.router.navigate(['/layout'])
 }
}
