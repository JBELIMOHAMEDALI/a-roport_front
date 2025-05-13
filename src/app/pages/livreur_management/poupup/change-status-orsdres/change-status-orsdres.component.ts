import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';

@Component({
  selector: 'app-change-status-orsdres',
  templateUrl: './change-status-orsdres.component.html',
  styleUrls: ['./change-status-orsdres.component.scss']
})
export class ChangeStatusOrsdresComponent implements OnInit {
  @Input() title;
  @Input() add;//de l'instance openAdd du composant list-patient
  @Input() obj;
  model: any = {}

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,

    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
    if (this.add) {
      this.model = {};
    } else {

      this.model.status = this.obj.status;
    }
  }

  async Onsubmit(f:NgForm){
    let payload = {};
    this.backendService
        .put(`${environment.apiUrl}/orders/${this.obj.id}/${f.value.status}`, payload)
        .subscribe(
          new Observer(
            this.router,
            null,
            true,
            true,
            this.sharedService,
            this.activeModal
          ).OBSERVER_EDIT()
        );
    }

    

}
