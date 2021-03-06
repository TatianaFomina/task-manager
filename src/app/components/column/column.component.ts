import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Column, Card, ColumnUI } from 'src/app/state/columns/column.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardEditorComponent, EditorOptions, ModalActions } from '../card-editor/card-editor.component';
import { ColumnsService } from 'src/app/state/columns/column.service';
import { ColumnsQuery } from 'src/app/state/columns/columns.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy {

  @Input() data: Column;
  @Output() cardDrop = new EventEmitter<CdkDragDrop<Card[]>>();

  public newCardEditable: boolean;
  public columnTitleControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  private titleSub: Subscription;

  constructor(private columnsService: ColumnsService, private columnsQuery: ColumnsQuery, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.columnTitleControl.setValue(this.data.title);
    this.titleSub = this.columnTitleControl.valueChanges.subscribe(value => {
      this.columnsService.update(this.data.id, value);
    });
    this.newCardEditable = this.columnsQuery.getEnabledEditing(this.data.id);
  }

  ngOnDestroy() {
    this.titleSub.unsubscribe();
  }

  addNewCard(cardTitle: string): void {
    this.columnsService.addCard(this.data.id, cardTitle);
  }

  drop(event: CdkDragDrop<Card[]>): void {
    this.cardDrop.emit(event);
  }

  deleteClick(): void {
    this.columnsService.delete(this.data.id);
  }

  openCardEditor(card: Card): void {
    const options: EditorOptions = {
      columnTitle: this.data.title,
      cardData: card
    };
    const modalRef = this.modalService.open(CardEditorComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.options = options;
    modalRef.result.then(
      result => {
        switch (result.action) {
          case ModalActions.UPDATE:
            this.columnsService.updateCard(this.data.id, result.data);
            break;
        case ModalActions.DELETE:
          this.columnsService.deleteCard(this.data.id, result.data.id);
          break;
        }
      },
      () => {}
    );
  }

}
