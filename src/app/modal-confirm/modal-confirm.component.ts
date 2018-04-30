import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  @Input() message: String
  @Output() doFunction = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  makeFunction(ejecute) {
    ejecute ? this.doFunction.emit(true) : this.doFunction.emit(false) 
  }

}
