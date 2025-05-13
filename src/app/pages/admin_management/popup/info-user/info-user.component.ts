import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  user:any={}
  @Input() title;
  @Input() obj;

  constructor(public activeModal: NgbActiveModal ) { }
  ngOnInit() {
    console.log(this.obj);
    
  }

}
