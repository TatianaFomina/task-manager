import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, guid, StoreConfig } from '@datorama/akita';
import { Column, ColumnUI } from './column.model';

export interface ColumnsState extends EntityState<Column, string> { }
export interface ColumnsUIState extends EntityState<ColumnUI, string> { }

const initialState = { };

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'columns' })
export class ColumnsStore extends EntityStore<ColumnsState> {
  ui: EntityUIStore<ColumnsUIState>;

  constructor() {
    super(initialState);
    const defaults: ColumnUI = { newCardEditable: false };
    this.createUIStore().setInitialEntityState(defaults);
  }
}
