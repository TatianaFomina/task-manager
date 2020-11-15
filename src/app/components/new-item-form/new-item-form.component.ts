import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ColumnsService } from 'src/app/state/columns/column.service';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() submit = new EventEmitter<string>();
  @ViewChild('input') cardTitleInput: ElementRef;
  @Input() editMode = false;
  @Input() itemType = 'card';
  @Input() columnId: string;

  public formControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  private sub: Subscription;

  get placeholder(): string {
    return `Enter ${this.itemType} title...`;
  }

  constructor(private cd: ChangeDetectorRef, private eRef: ElementRef, private columnsService: ColumnsService) { }

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.formControl.setValue(value?.replace(/^\n|\n$/g, ''), { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cardTitleInput?.nativeElement.focus();
  }

  save(): void {
    this.submit.emit(this.formControl.value.trim());
    this.formControl.reset();
    this.cardTitleInput.nativeElement.focus();
    if (this.itemType === 'card') {
      this.columnsService.setNewCardEditable(this.columnId, true);
    }
  }

  disableEditing(): void {
    this.formControl.reset();
    this.editMode = false;
    if (this.itemType === 'card') {
      this.columnsService.setNewCardEditable(this.columnId, false);
    }
  }

  enableEditing(): void {
    this.editMode = true;
    this.cd.detectChanges();
    this.cardTitleInput.nativeElement.focus();
    if (this.itemType === 'card') {
      this.columnsService.setNewCardEditable(this.columnId, true);
    }
  }

  addButtonClicked(): void {
    setTimeout(() => {
      this.enableEditing();
    });
  }

  saveButtonClicked(): void {
    setTimeout(() => {
      this.save();
    });
  }

  discardButtonClicked(): void {
    this.disableEditing();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (event.target === this.cardTitleInput?.nativeElement) {
      if (this.formControl.invalid) { return; }
      this.save();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.formControl.invalid) {
        this.disableEditing();
      } else {
        this.save();
        this.disableEditing();
      }
    }
  }

}
