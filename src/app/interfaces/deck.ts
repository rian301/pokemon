import { Card } from "./card";

export interface Deck {
  id: number;
  name: string;
  cards: Card[];
  userId: string;
  uid: string;
}
