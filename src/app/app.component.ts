import { Component } from '@angular/core';
import { Column, Card } from './state/columns/column.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ColumnsService } from './state/columns/column.service';
import { ColumnsQuery } from './state/columns/columns.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns$: Observable<Column[]>;

  constructor(private columnsService: ColumnsService, private columnsQuery: ColumnsQuery) {
    this.columns$ = this.columnsQuery.selectAll();
    this.columnsService.add('test');
  }

  drop(event: CdkDragDrop<Card[]>) {
    let card;
    if (event.previousContainer === event.container) {
      card = event.container.data[event.previousIndex];
      this.columnsService.moveCardInColumn(event.container.id, card, event.currentIndex);
    } else {
      card = event.previousContainer.data[0];
      this.columnsService.moveCard(event.previousContainer.id, event.container.id, card);
    }

  }

  addColumn(title: string) {
    this.columnsService.add(title);
  }
}
