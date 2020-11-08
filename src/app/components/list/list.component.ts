import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input() data: List;

  constructor() { }

  ngOnInit(): void {
  }

}