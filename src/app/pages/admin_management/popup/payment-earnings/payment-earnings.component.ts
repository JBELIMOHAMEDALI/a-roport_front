import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';

@Component({
  selector: 'app-payment-earnings',
  templateUrl: './payment-earnings.component.html',
  styleUrls: ['./payment-earnings.component.scss']
})
export class PaymentEarningsComponent implements OnInit {
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
  }

  async Onsubmit(f: NgForm) {
    //cree un obj payload comme lajout mais inclut l'id du patient
    let payload = { ...f.value};

     this.backendService
            .post(`${environment.apiUrl}/earnings/magazine/${this.obj.magazin.id}/payment`, payload)
            .subscribe(
              new Observer(
                this.router,
                null,
                true,
                true,
                this.sharedService,
                this.activeModal
              ).OBSERVER_POST()
            );
    // this.backendService
    //   .put(`${environment.apiUrl}/earnings/magazine/${this.obj.magazin.id}/payment`, payload)
    //   .subscribe(
    //     new Observer(
    //       this.router,
    //       null,
    //       true,
    //       true,
    //       this.sharedService,
    //       this.activeModal
    //     ).OBSERVER_EDIT()
    //   );

  }



}
