import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { NewTaskFormComponent } from './components/new-task-form/new-task-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TitleEditorComponent } from './components/list-title/list-title.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    NewTaskFormComponent,
    TitleEditorComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
