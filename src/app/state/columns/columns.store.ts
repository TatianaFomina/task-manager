import { Injectable } from '@angular/core';
import { EntityState, EntityStore, guid, StoreConfig } from '@datorama/akita';
import { Column } from './column.model';

export interface ColumnsState extends EntityState<Column, string> { };
// export

const initialState = { };

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'columns' })
export class ColumnsStore extends EntityStore<ColumnsState> {
  constructor() {
    super(initialState);
  }
}