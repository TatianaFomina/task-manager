import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { ColumnsState, ColumnsStore, ColumnsUIState } from './columns.store';

@Injectable({
  providedIn: 'root'
})
export class ColumnsQuery extends QueryEntity<ColumnsState> {

  ui: EntityUIQuery<ColumnsUIState>;

  constructor(protected store: ColumnsStore) {
    super(store);
    this.createUIQuery();
  }

  getEnabledEditing(columnId: string): boolean {
    return this.ui.getEntity(columnId).newCardEditable;
  }



}
