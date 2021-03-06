import { ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-title-editor',
  templateUrl: './title-editor.component.html',
  styleUrls: ['./title-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TitleEditorComponent),
      multi: true
    }
  ]
})
export class TitleEditorComponent implements ControlValueAccessor, OnInit {

  @Input() editMode = false;

  public control = new FormControl(null, [
    Validators.required,
    Validators.minLength(1)
  ]);

  get value(): string {
    return this.control.value;
  }

  private prevValue: string;

  @ViewChild('input') inputElement: ElementRef;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('click') onClick(): void {
    if (this.control.touched && this.control.invalid) { return; }
    this.enableEditing();
  }

  focusout(): void {
    if (this.control.invalid) {
      this.onChange(this.prevValue);
      this.control.setValue(this.prevValue);
    }
    this.save();
  }

  save(): void {
    if (this.control.invalid) { return; }
    this.onChange(this.control.value);
    this.editMode = false;
  }

  enableEditing(): void {
    this.editMode = true;
    this.cd.detectChanges();
    this.inputElement.nativeElement.focus();
  }

  writeValue(value: any): void {
    this.prevValue = value;
    this.control.setValue(value);
  }

  private onTouched = () => { };

  private onChange: (value: string) => void = () => { };

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

}
