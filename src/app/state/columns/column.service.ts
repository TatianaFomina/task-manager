import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, transaction } from '@datorama/akita';
import { Card, Column, createCard, createColumn } from './column.model';
import { ColumnsStore } from './columns.store';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  constructor(private store: ColumnsStore) {}

  add(title: string) {
    const column = createColumn(title);
    this.store.add(column);
  }

  update(id: string, title: string) {
    this.store.update(id, { title });
  }

  delete(id: string) {
    debugger
    this.store.remove(id);
  }

  addCard(columnId: string, cardTitle: string) {
    const card = createCard(cardTitle);
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayAdd(column.cards, card)
      }
    });
  }

  updateCard(columnId: string, updateOptions: Card) {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayUpdate(column.cards, updateOptions.id, updateOptions)
      }
    });
  }

  deleteCard(columnId: string, cardId: string) {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayRemove(column.cards, cardId)

      }
    });
    console.log(this.store.getValue())
  }

  @transaction()
  moveCard(sourceColumnId: string, targetColumnId: string, card: Card) {
    this.deleteCard(sourceColumnId, card.id);
    this.store.update(targetColumnId, column => {
      return {
        ...column,
        cards: arrayAdd(column.cards, card)
      }
    });
  }

  @transaction()
  moveCardInColumn(columnId: string, card: Card, newIndex: number) {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayRemove(column.cards, card.id)
      }
    });

    this.store.update(columnId, column => {
      const cards = [...column.cards];
      const head = cards.slice(0, newIndex);
      const tail = cards.slice(newIndex, cards.length);
      return {
        ...column,
        cards: [...head, card, ...tail]
      }
    })
  }
  
}