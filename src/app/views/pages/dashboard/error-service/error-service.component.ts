import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-service',
  templateUrl: './error-service.component.html',
  styleUrls: ['./error-service.component.scss']
})
export class ErrorServiceComponent implements OnInit {
  @Output()
  tryAgain = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  castEvent() {
    this.tryAgain.emit();
  }
}
