import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumnComponent } from './components/column/column.component';
import { CardComponent } from './components/card/card.component';
import { NewTaskFormComponent } from './components/new-task-form/new-task-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TitleEditorComponent } from './components/title-editor/title-editor.component';
import { CardEditorComponent } from './components/card-editor/card-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    CardComponent,
    NewTaskFormComponent,
    TitleEditorComponent,
    CardEditorComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    NgbDropdownModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
