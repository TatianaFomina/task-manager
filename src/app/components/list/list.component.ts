import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardEditorComponent, EditorOptions, ModalActions } from '../card-editor/card-editor.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: List;
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() delete = new EventEmitter<string>();

  public newTaskFormDisplayed: boolean = false;
  public editTitle: boolean = false;
  public columnTitleControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.columnTitleControl.setValue(this.data.name);
  }

  addNewCard(cardTitle: string): void {
    this.data.tasks.push({title: cardTitle, id: uuidv4()});
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.cardDrop.emit(event);
  }

  deleteClick() {
    this.delete.emit(this.data.id);
  }

  openCardEditor(task: Task) {
    const options: EditorOptions = {
      columnName: this.data.name,
      cardData: task
    };
    const modalRef = this.modalService.open(CardEditorComponent);
    modalRef.componentInstance.options = options;
    modalRef.result.then(
      result => {
        switch (result.action) {
          case ModalActions.UPDATE:
            const cardToUpdate = this.data.tasks.find(card => card.id === result.data.id);
            cardToUpdate.title = result.data.title;
            cardToUpdate.description = result.data.description;
            break;
        case ModalActions.DELETE:
          const cardIndexToDelete = this.data.tasks.findIndex(card => card.id === result.data.id);
          this.data.tasks.splice(cardIndexToDelete, 1);
          break;
        }
        
      },
      () => {}
    );
  }

}
