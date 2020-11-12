import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-title',
  templateUrl: './list-title.component.html',
  styleUrls: ['./list-title.component.scss']
})
export class TitleEditorComponent implements OnInit {

  @Input() value: string;
  @Input() editMode: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  
  public control = new FormControl(null, [
    Validators.required,
    Validators.minLength(1)
  ]);

  @ViewChild('input') inputElement: ElementRef;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('click') onClick() {
    if (this.control.touched && this.control.invalid) { return; }
    this.enableEditting();
  }

  save() {
    if (this.control.invalid) { return; }
    this.value = this.control.value;
    this.valueChange.emit();
    this.editMode = false;
  }

  enableEditting() {
    this.control.setValue(this.value);
    this.editMode = true;
    this.cd.detectChanges();
    this.inputElement.nativeElement.focus();
  }

}
