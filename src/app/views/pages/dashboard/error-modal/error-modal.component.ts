import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  @Output()
  tryAgain = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  castEvent() {
    this.tryAgain.emit();
  }

}
