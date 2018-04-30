import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  @Input() messages: any
  @Output() closeModal = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeModal.emit() 
  }

}
