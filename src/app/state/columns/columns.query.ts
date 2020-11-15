import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ColumnsState, ColumnsStore } from './columns.store';

@Injectable({
  providedIn: 'root'
})
export class ColumnsQuery extends QueryEntity<ColumnsState> {
  
  constructor(protected store: ColumnsStore) {
    super(store);
  }

  // selectCards

  // selectCards() {
  //   return combineQueries([
  //     this.selectAll(),
  //     this.cardsQuery.selectAll()
  //   ]).pipe(
  //     map(([columns, cards]) => {
  //       return columns.map(column => {
  //         return {
  //           ...column,
  //           cards: cards.filter(card => card.columnId === column.id)
  //         };
  //       })
  //     })
  //   )
  // }

}