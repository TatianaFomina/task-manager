import { Component } from '@angular/core';
import { Column, Card } from './state/columns/column.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ColumnsService } from './state/columns/column.service';
import { ColumnsQuery } from './state/columns/columns.query';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns$: Observable<Column[]>;

  constructor(private columnsService: ColumnsService, private columnsQuery: ColumnsQuery) {
    this.columns$ = this.columnsQuery.selectAll();
  }

  drop(event: CdkDragDrop<Card[]>): void {
    let card;
    if (event.previousContainer === event.container) {
      card = event.container.data[event.previousIndex];
      this.columnsService.moveCardInColumn(event.container.id, card, event.currentIndex);
    } else {
      card = event.previousContainer.data[event.previousIndex];
      this.columnsService.moveCard(event.previousContainer.id, event.container.id, card, event.currentIndex);
    }

  }

  addColumn(title: string): void {
    this.columnsService.add(title);
  }
}
