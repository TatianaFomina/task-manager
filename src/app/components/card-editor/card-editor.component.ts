import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card.model';

export interface EditorOptions {
  columnName: string;
  cardData: Card;
}

export enum ModalActions {
  UPDATE, DELETE
}

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  @Input() options: EditorOptions;
  form: FormGroup;

  constructor(private modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.options.cardData.title],
      description: []
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  submit() {
    this.modal.close({
      action: ModalActions.UPDATE,
      data:{
        ...this.options.cardData,
        ...this.form.value
      }
    });
  }

  delete() {
    this.modal.close({ action: ModalActions.DELETE, data: { id: this.options.cardData.id }});
  }

}
