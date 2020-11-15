import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/state/columns/column.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data: Card;

  constructor() { }

  ngOnInit(): void {
  }

}
