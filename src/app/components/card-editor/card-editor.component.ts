import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task.model';

export interface EditorOptions {
  columnName: string;
  cardData: Task;
}

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss']
})
export class CardEditorComponent implements OnInit {

  options: EditorOptions;
  cardTitleControl = new FormControl(null); 

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.cardTitleControl.setValue(this.options.cardData.title);
  }

  dismiss() {
    this.modal.dismiss();
  }

  submit() {
    this.modal.close();
  }

}
