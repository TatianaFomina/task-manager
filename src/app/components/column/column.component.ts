import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from 'src/app/models/column.model';
import { Card } from 'src/app/models/card.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardEditorComponent, EditorOptions, ModalActions } from '../card-editor/card-editor.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  @Input() data: Column;
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Card[]>>();
  @Output() delete = new EventEmitter<string>();

  public newCardFormDisplayed: boolean = false;
  public editTitle: boolean = false;
  public columnTitleControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.columnTitleControl.setValue(this.data.name);
  }

  addNewCard(cardTitle: string): void {
    this.data.cards.push({title: cardTitle, id: uuidv4()});
  }

  drop(event: CdkDragDrop<Card[]>): void {
    this.cardDrop.emit(event);
  }

  deleteClick() {
    this.delete.emit(this.data.id);
  }

  openCardEditor(card: Card) {
    const options: EditorOptions = {
      columnName: this.data.name,
      cardData: card
    };
    const modalRef = this.modalService.open(CardEditorComponent);
    modalRef.componentInstance.options = options;
    modalRef.result.then(
      result => {
        switch (result.action) {
          case ModalActions.UPDATE:
            const cardToUpdate = this.data.cards.find(card => card.id === result.data.id);
            cardToUpdate.title = result.data.title;
            cardToUpdate.description = result.data.description;
            break;
        case ModalActions.DELETE:
          const cardIndexToDelete = this.data.cards.findIndex(card => card.id === result.data.id);
          this.data.cards.splice(cardIndexToDelete, 1);
          break;
        }
        
      },
      () => {}
    );
  }

}
