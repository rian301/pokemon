import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Deck } from '../../interfaces/deck';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../interfaces/card';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { localStorageKeys } from 'src/app/enums/localstorage.enum';
import { UserInfo } from 'src/app/interfaces/user-info';

@Injectable({
  providedIn: 'root'
})

export class DeckService {
  private decks: Deck[] = [];

  constructor(
		private http: HttpClient,
    private firestore: AngularFirestore
	) { }

  getCards(): Observable<{ cards: Card[] }> {
    return this.http.get<{ cards: Card[] }>('https://api.pokemontcg.io/v1/cards')
  }

  getDecks(): Observable<Deck[]> {
    return this.firestore.collection<Deck>('decks', ref => ref.where('userId', '==', this.getUserId())).valueChanges();
  }

  async addDeck(deck: Deck, isMock?: boolean): Promise<void> {
    const uid = this.firestore.createId();
    deck.userId = this.getUserId();
    if (!isMock) deck.id = await this.getNextDeckId();
    deck.uid = uid; 
    return this.firestore.collection('decks').doc(uid).set(deck);
  }

  removeDeck(uid: string): Promise<void> {
    return this.firestore.collection('decks').doc(uid).delete();
  }

  updateDeck(updatedDeck: Deck, uid: string): Promise<void> {
    return this.firestore.collection('decks').doc(uid).update(updatedDeck);
  }

  getDeckById(id: number): Observable<Deck> {
    return this.firestore.collection<Deck>('decks', ref => ref.where('id', '==', id)).valueChanges()
    .pipe(map(deckArray => { return deckArray[0] }));
  }

  async createMockDecks() {
    this.decks = [];
    const mockDecks: Deck[] = [
      {
        id: 1,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ],
        uid: '',
        userId: this.getUserId()
      },
      {
        id: 2,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ],
        uid: '',
        userId: this.getUserId()
      },
      {
        id: 3,
        name: 'Deck Inicial',
        cards: [
          { name: 'Vespiquen', id: 1, imageUrl: 'https://images.pokemontcg.io/xy7/10.png', types: [], supertype: 'Pokémon' },
          { name: 'Snorlax', id: 2, imageUrl: 'https://images.pokemontcg.io/xy0/26.png', types: [], supertype: 'Pokémon' },
          { name: 'Greninja', id: 3, imageUrl: 'https://images.pokemontcg.io/xy0/14.png', types: [], supertype: 'Pokémon' },
        ],
        uid: '',
        userId: this.getUserId()
      }
    ];

    // Adiciona os decks mockados ao array principal e atualiza o BehaviorSubject
    const promises: Promise<void>[] = [];
    mockDecks.forEach(deck => {
      promises.push(this.addDeck(deck, true))
    });
    await Promise.all(promises);
  }

  private async getNextDeckId(): Promise<number> {
    return this.firestore.collection('decks').get().toPromise()
      .then(snapshot => snapshot.size + 1);
  }

  private getUserId(): string {
    const user: UserInfo = JSON.parse(localStorage.getItem(localStorageKeys['user']));
    return user?.id;
  }
}
