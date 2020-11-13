import { Component } from '@angular/core';
import { List } from './models/list.model';
import { Task } from './models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks';
  lists: List[] = [{
    id: uuidv4(),
    name: "To Do",
    tasks: [
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
    tasks: [
      {
        id: uuidv4(),
        title: "Buy Onion"
      }
    ]
  }];

  drop(event: CdkDragDrop<Task[]>) {
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
    const columnIndexToDelete = this.lists.findIndex(column => column.id === columnId);
    this.lists.splice(columnIndexToDelete, 1);
  }
}
