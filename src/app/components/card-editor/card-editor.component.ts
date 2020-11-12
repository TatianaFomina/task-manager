import { Component, OnInit } from '@angular/core';
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

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.modal.dismiss();
  }

  submit() {
    this.modal.close();
  }

}
