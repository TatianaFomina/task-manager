import { Component } from '@angular/core';
import { Column } from './models/column.model';
import { Card } from './models/card.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks';
  columns: Column[] = [{
    id: uuidv4(),
    name: "To Do",
    cards: [
      {
        id: uuidv4(),
        title: "Buy Bread"
      },
      {
        id: uuidv4(),
        title: "Buy Eggs"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Done",
    cards: [
      {
        id: uuidv4(),
        title: "Buy Onion"
      }
    ]
  }];

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  deleteColumn(columnId: string) {
    const columnIndexToDelete = this.columns.findIndex(column => column.id === columnId);
    this.columns.splice(columnIndexToDelete, 1);
  }
}
