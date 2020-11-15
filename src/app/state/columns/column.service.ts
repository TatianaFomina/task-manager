import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, transaction } from '@datorama/akita';
import { Card, createCard, createColumn } from './column.model';
import { ColumnsStore } from './columns.store';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  constructor(private store: ColumnsStore) {

    if (!this.store.getValue().ids.length) {
      this.addDefaults();
    }
  }

  add(title: string): void {
    const column = createColumn(title);
    this.store.add(column);
  }

  update(id: string, title: string): void {
    this.store.update(id, { title });
  }

  delete(id: string): void {
    this.store.remove(id);
  }

  addCard(columnId: string, cardTitle: string): void {
    const card = createCard(cardTitle);
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayAdd(column.cards, card)
      };
    });
  }

  updateCard(columnId: string, updateOptions: Card): void {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayUpdate(column.cards, updateOptions.id, updateOptions)
      };
    });
  }

  deleteCard(columnId: string, cardId: string): void {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayRemove(column.cards, cardId)
      };
    });
  }

  @transaction()
  moveCard(sourceColumnId: string, targetColumnId: string, card: Card): void {
    this.deleteCard(sourceColumnId, card.id);
    this.store.update(targetColumnId, column => {
      return {
        ...column,
        cards: arrayAdd(column.cards, card)
      };
    });
  }

  @transaction()
  moveCardInColumn(columnId: string, card: Card, newIndex: number): void {
    this.store.update(columnId, column => {
      return {
        ...column,
        cards: arrayRemove(column.cards, card.id)
      };
    });

    this.store.update(columnId, column => {
      const cards = [...column.cards];
      const head = cards.slice(0, newIndex);
      const tail = cards.slice(newIndex, cards.length);
      return {
        ...column,
        cards: [...head, card, ...tail]
      };
    });
  }

  setNewCardEditable(columnId: string, newValue: boolean): void {
    this.store.ui.update(columnId, { newCardEditable: newValue });
  }

  @transaction()
  private addDefaults(): void {
    const column1 = createColumn('To Do');
    const column2 = createColumn('Done');
    this.store.reset();
    this.store.add(column1);
    this.addCard(column1.id, 'Buy Bread');
    this.addCard(column1.id, 'Buy Onion');
    this.store.add(column2);
    this.addCard(column2.id, 'Buy Eggs');
  }

}
