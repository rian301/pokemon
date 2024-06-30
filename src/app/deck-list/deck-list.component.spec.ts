import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckListComponent } from './deck-list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DeckService } from '../services/deck-service';

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;
  let deckService: DeckService;

  beforeEach(async () => {
    const deckServiceMock = {
      getDecks: () => of([
        { id: 1, name: 'Test Deck 1', cards: [] },
        { id: 2, name: 'Test Deck 2', cards: [] }
      ])
    };

    await TestBed.configureTestingModule({
      declarations: [DeckListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: DeckService, useValue: deckServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of decks', () => {
    const compiled = fixture.nativeElement;
    const deckElements = compiled.querySelectorAll('h3');

    expect(deckElements.length).toBe(2);
    expect(deckElements[0].textContent).toContain('Test Deck 1');
    expect(deckElements[1].textContent).toContain('Test Deck 2');
  });

  it('should call deleteDeck when delete button is clicked', () => {
    spyOn(component, 'deleteDeck');

    const deleteButton = fixture.nativeElement.querySelector('.bg-red-500');
    deleteButton.click();

    expect(component.deleteDeck).toHaveBeenCalledWith(1);
  });
});
