import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter<string>();
  @ViewChild('input') cardTitleInput: ElementRef;

  public formControl = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  private sub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.sub = this.formControl.valueChanges.subscribe(value => {
      this.formControl.setValue(value?.replace(/^\s+|\s+$/g, ''), { emitEvent: false });
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    this.cardTitleInput.nativeElement.focus();
  }

  onSubmit(): void {
    if (this.formControl.invalid) {
      return;
    }
    this.submit.emit(this.formControl.value.trim());
    this.formControl.reset();
    this.cardTitleInput.nativeElement.focus();
  }

  onDiscard(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.target === this.cardTitleInput.nativeElement) {
      this.onSubmit();
    }
  }

}
