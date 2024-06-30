import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeckService } from './deck-service';

describe('DeckService', () => {
  let service: DeckService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeckService]
    });
    service = TestBed.inject(DeckService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cards', () => {
    const mockCards = { cards: [{ id: '1', name: 'Pikachu' }] };

    service.getCards().subscribe(cards => {
      expect(cards.cards.length).toBe(1);
      expect(cards.cards[0].name).toBe('Pikachu');
    });

    const req = httpMock.expectOne('https://api.pokemontcg.io/v1/cards');
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should add a deck', () => {
    const mockDeck = { id: 0, name: 'Test Deck', cards: [] as any};
    service.addDeck(mockDeck);

    service.getDecks().subscribe(decks => {
      expect(decks.length).toBe(1);
      expect(decks[0].name).toBe('Test Deck');
    });
  });

  it('should delete a deck', () => {
    const mockDeck = { id: 1, name: 'Test Deck', cards: [] as any};
    service.addDeck(mockDeck);

    service.removeDeck(1);

    service.getDecks().subscribe(decks => {
      expect(decks.length).toBe(0);
    });
  });
});
