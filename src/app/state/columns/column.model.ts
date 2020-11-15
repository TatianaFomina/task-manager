import { guid } from '@datorama/akita';

export type Column = {
  id: string;
  title: string;
  cards: Card[]
};

export type ColumnUI = {
  newCardEditable: boolean;
};

export type Card = {
  id: string;
  title: string;
  description?: string;
};


export function createColumn(title: string): Column {
  return {
    id: guid(),
    title,
    cards: []
  };
}

export function createCard(title: string): Card {
  return {
    id: guid(),
    title
  };
}

