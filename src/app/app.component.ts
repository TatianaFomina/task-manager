import { Component } from '@angular/core';
import { List } from './models/list.model';
import { Task } from './models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks';
  lists: List[] = [{
    id: "id",
    name: "To Do",
    tasks: [
      {
        id: "id",
        title: "Buy Bread"
      },
      {
        id: "id",
        title: "Buy Eggs"
      }
    ]
  },
  {
    id: "id",
    name: "Done",
    tasks: [
      {
        id: "id",
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
}
