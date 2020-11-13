import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit, OnDestroy {

  @Output() submit = new EventEmitter<string>();
  @ViewChild('input') cardTitleInput: ElementRef;
  @Input() editMode: boolean = false;
  @Input() itemType: string = 'card';

  public formControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  private sub: Subscription;

  get placeholder() {
    return `Enter ${this.itemType} title...`;
  }

  constructor(private cd: ChangeDetectorRef, private eRef: ElementRef) { }

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.formControl.setValue(value?.replace(/^\s+|\s+$/g, ''), { emitEvent: false });
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  save(): void {
    this.submit.emit(this.formControl.value.trim());
    this.formControl.reset();
    this.cardTitleInput.nativeElement.focus();
  }

  disableEditing(): void {
    this.formControl.reset();
    this.editMode = false;
  }

  addButtonClicked() {
    setTimeout(() => {
      this.enableEditing();
    });
  }

  discardButtonClicked() {
    this.disableEditing();
  }

  enableEditing() {
    this.editMode = true;
    this.cd.detectChanges();
    this.cardTitleInput.nativeElement.focus();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.target === this.cardTitleInput?.nativeElement) {
      if (this.formControl.invalid) { return; }
      this.save();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.formControl.invalid) {
        this.disableEditing();
      } else {
        this.save();
      }
    }
  }

}
