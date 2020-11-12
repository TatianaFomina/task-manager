import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardEditorComponent, EditorOptions } from '../card-editor/card-editor.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: List;
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Task[]>>();

  public newTaskFormDisplayed: boolean = false;
  public editTitle: boolean = false;
  public listTitleControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addNewCard(cardTitle: string): void {
    this.data.tasks.push({title: cardTitle, id: ''});
  }

  showTitleEditor(): void {
    this.listTitleControl.setValue(this.data.name);
    this.editTitle = true;
  }

  titleInputFocusout() {
    this.data.name = this.listTitleControl.value;
    this.editTitle = false;
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.cardDrop.emit(event);
  }

  openCardEditor(task: Task) {
    const options: EditorOptions = {
      columnName: null,
      cardData: task
    };
    const modalRef = this.modalService.open(CardEditorComponent);
    modalRef.componentInstance.options = options;
    modalRef.result.then(
      result => {},
      () => {}
    );
  }

}
