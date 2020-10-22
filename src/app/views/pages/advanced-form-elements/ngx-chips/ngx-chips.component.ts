import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-chips',
  templateUrl: './ngx-chips.component.html',
  styleUrls: ['./ngx-chips.component.scss']
})
export class NgxChipsComponent implements OnInit {

  items = ['Pizza', 'Pasta', 'Parmesan'];
  itemsAsObjects = [{id: 0, name: 'Pizza', readonly: true}, {id: 1, name: 'Pasta'}, {id: 2, name: 'Parmesan', readonly: true}];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(item) {
  }

  onSelect(item) {
  }

  onTagEdited(item) {
  }

  onTextChange(text) {
  }

}
