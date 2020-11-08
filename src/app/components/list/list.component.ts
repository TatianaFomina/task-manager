import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: List;

  public newTaskFormDisplayed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewCard(cardTitle: string) {
    // console.log(cardTitle)
    this.data.tasks.push({title: cardTitle, id: ''})
    // this.newTaskFormDisplayed = true;
  }

}
