import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckFormComponent } from './deck-form.component';
import { DeckService } from '../services/deck-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Card } from '../interfaces/card';

describe('DeckFormComponent', () => {
  let component: DeckFormComponent;
  let fixture: ComponentFixture<DeckFormComponent>;
  let deckService: jasmine.SpyObj<DeckService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockDeck = { id: 1, name: 'Test Deck', cards: [] as Card[] };
  const mockCards: Card[] = [
    { id: 1, name: 'Pikachu', imageUrl: '', types: [], supertype: '' },
    { id: 2, name: 'Charizard', imageUrl: '', types: [], supertype: '' }
  ];

  beforeEach(async () => {
    const deckServiceSpy = jasmine.createSpyObj('DeckService', ['getDeckById', 'getCards', 'addDeck', 'updateDeck']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } } });

    await TestBed.configureTestingModule({
      declarations: [DeckFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: DeckService, useValue: deckServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFormComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService) as jasmine.SpyObj<DeckService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    deckService.getDeckById.and.returnValue(mockDeck);
    deckService.getCards.and.returnValue(of({ cards: mockCards }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with deck data when editing', () => {
    expect(component.deck).toEqual(mockDeck);
    expect(component.isEditMode).toBeTrue();
  });

  it('should fetch all cards on init', () => {
    expect(component.allCards.length).toBe(2);
    expect(component.allCards).toEqual(mockCards);
  });

  it('should add card to deck if valid', () => {
    component.cardName = 'Pikachu';
    component.addCard();
    expect(component.deck.cards.length).toBe(1);
    expect(component.deck.cards[0].name).toBe('Pikachu');
  });

  it('should show confirmation message if card is not selected', () => {
    component.cardName = '';
    component.addCard();
    expect(component.message).toBe('Selecione uma carta');
    expect(component.showAlert).toBeTrue();
  });

  it('should show confirmation message if more than 4 cards are added', () => {
    component.deck.cards = [{ name: 'Pikachu', id: 1, imageUrl: '', types: [], supertype: '' },
                            { name: 'Pikachu', id: 1, imageUrl: '', types: [], supertype: '' },
                            { name: 'Pikachu', id: 1, imageUrl: '', types: [], supertype: '' },
                            { name: 'Pikachu', id: 1, imageUrl: '', types: [], supertype: '' }];
    component.cardName = 'Pikachu';
    component.addCard();
    expect(component.message).toBe('O Deck pode conter no máximo 4 cartas com o mesmo nome.');
    expect(component.showAlert).toBeTrue();
  });

  it('should remove card from deck', () => {
    component.deck.cards = [{ name: 'Pikachu', id: 1, imageUrl: '', types: [], supertype: '' }];
    component.removeCard(0);
    expect(component.deck.cards.length).toBe(0);
  });

  it('should show image and overlay', () => {
    component.showImage('test-url');
    expect(component.largeImageUrl).toBe('test-url');
    expect(document.querySelector('.overlay')?.classList.contains('active')).toBeTrue();
  });

  it('should hide image and overlay', () => {
    component.hideImage();
    expect(component.largeImageUrl).toBe('');
    expect(document.querySelector('.overlay')?.classList.contains('active')).toBeFalse();
  });

  it('should show confirmation message if deck has less than 24 or more than 60 cards', () => {
    component.deck.cards = Array(23).fill(mockCards[0]);
    component.saveDeck();
    expect(component.message).toBe('O Deck deve ter entre 24 e 60 cartas.');
    expect(component.showAlert).toBeTrue();

    component.deck.cards = Array(61).fill(mockCards[0]);
    component.saveDeck();
    expect(component.message).toBe('O Deck deve ter entre 24 e 60 cartas.');
    expect(component.showAlert).toBeTrue();
  });

  it('should show confirmation message if deck name is empty', () => {
    component.deck.name = '';
    component.saveDeck();
    expect(component.message).toBe('Escolha um nome para o Deck');
    expect(component.showAlert).toBeTrue();
  });

  it('should update deck if in edit mode', () => {
    component.deck.name = 'Updated Deck';
    component.saveDeck();
    expect(deckService.updateDeck).toHaveBeenCalledWith(component.deck);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should add deck if not in edit mode', () => {
    component.isEditMode = false;
    component.deck.name = 'New Deck';
    component.saveDeck();
    expect(deckService.addDeck).toHaveBeenCalledWith(component.deck);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
