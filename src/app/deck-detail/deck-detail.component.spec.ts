import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckDetailComponent } from './deck-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../services/deck-service';
import { of } from 'rxjs';
import { Deck } from '../interfaces/deck';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('DeckDetailComponent', () => {
  let component: DeckDetailComponent;
  let fixture: ComponentFixture<DeckDetailComponent>;
  let deckService: jasmine.SpyObj<DeckService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  const mockDeck: Deck = {
    id: 1,
    name: 'Test Deck',
    cards: [
      { id: 1, name: 'Pikachu', imageUrl: '', types: ['Electric'], supertype: 'Pokémon' },
      { id: 2, name: 'Charizard', imageUrl: '', types: ['Fire'], supertype: 'Pokémon' },
      { id: 2, name: 'Blastoise', imageUrl: '', types: ['Water'], supertype: 'Pokémon' },
    ]
  };

  beforeEach(async () => {
    const deckServiceSpy = jasmine.createSpyObj('DeckService', ['getDeckById', 'removeDeck']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DeckDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: DeckService, useValue: deckServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDetailComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService) as jasmine.SpyObj<DeckService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    deckService.getDeckById.and.returnValue(mockDeck);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get deck on init', () => {
    expect(component.deck).toEqual(mockDeck);
    expect(component.uniqueTypes).toBe(3);
    expect(component.superTypes).toBe(1);
  });

  it('should calculate unique types', () => {
    component.calculateUniqueTypes();
    expect(component.uniqueTypes).toBe(3);
  });

  it('should calculate super types', () => {
    component.calculateSuperTypes();
    expect(component.superTypes).toBe(1);
  });

  it('should navigate back to main page', () => {
    component.back();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to edit page', () => {
    component.editDeck(1);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-deck/1']);
  });

  it('should show confirmation alert', () => {
    component.showConfirmation(1);
    expect(component.showAlert).toBeTrue();
    expect(component.confirmId).toBe(1);
  });

  it('should hide confirmation alert', () => {
    component.hideConfirmation();
    expect(component.showAlert).toBeFalse();
    expect(component.confirmId).toBeNull();
  });

  it('should delete deck and navigate back', () => {
    component.showConfirmation(1);
    component.deleteDeck(1);
    expect(deckService.removeDeck).toHaveBeenCalledWith(1);
    expect(component.showAlert).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
