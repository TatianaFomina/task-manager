import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskComponent } from '../task/task.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: List;
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Task[]>>();

  public newTaskFormDisplayed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewCard(cardTitle: string) {
    // console.log(cardTitle)
    this.data.tasks.push({title: cardTitle, id: ''})
    // this.newTaskFormDisplayed = true;
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.cardDrop.emit(event);
  }

}
