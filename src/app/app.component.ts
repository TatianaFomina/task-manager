import { Component } from '@angular/core';
import { List } from './models/list.model';

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
  }];
}
