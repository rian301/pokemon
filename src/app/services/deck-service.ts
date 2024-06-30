import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deck } from '../interfaces/deck';
import { HttpClient } from '@angular/common/http';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})

export class DeckService {
  private decksSubject = new BehaviorSubject<Deck[]>([]);
  private decks: Deck[] = [];
  private deckId = 1;

  constructor(
		private http: HttpClient
	) { }

  getCards(): Observable<{ cards: Card[] }> {
    return this.http.get<{ cards: Card[] }>('https://api.pokemontcg.io/v1/cards')
  }

  getDecks() {
    return this.decksSubject.asObservable();
  }

  addDeck(deck: Deck) {
    deck.id = this.deckId++;
    this.decks.push(deck);
    this.decksSubject.next(this.decks);
  }

  removeDeck(id: number) {
    this.decks = this.decks.filter(deck => deck.id !== id);
    this.decksSubject.next(this.decks);
  }

  updateDeck(updatedDeck: Deck) {
    const index = this.decks.findIndex(deck => deck.id === updatedDeck.id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
      this.decksSubject.next(this.decks);
    }
  }

  getDeckById(id: number) {
    return this.decks.find(deck => deck.id === id);
  }

  createMockDecks() {
    this.decks = [];
    const mockDecks: Deck[] = [
      {
        id: this.deckId++,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ]
      },
      {
        id: this.deckId++,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ]
      },
      {
        id: this.deckId++,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ]
      }
    ];

    // Adiciona os decks mockados ao array principal e atualiza o BehaviorSubject
    this.decks.push(...mockDecks);
    this.decksSubject.next(this.decks);
  }
}
