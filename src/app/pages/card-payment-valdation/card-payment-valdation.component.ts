import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { BackendService } from "../../service/backend.service";
import Observer from "../../service/observer";
import { environment } from "../../../environments/environment";
import { TokenStorageService } from "../../service/token-storage.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-card-payment-valdation',
  templateUrl: './card-payment-valdation.component.html',
  styleUrls: ['./card-payment-valdation.component.scss']
})
export class CardPaymentValdationComponent implements OnInit {
id:any
  constructor(

    private backendService: BackendService,
    private router: Router,
    private tokenService: TokenStorageService,
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  async Onsubmit(f: NgForm) {
    const { otp } = f.value;
    const id = this.tokenService.getDecodedUser().userId;
    this.backendService
      .post(`${environment.apiUrl}/orders/${this.id}/payment/verify-otp?userId=${id}&otp=${otp}`, null)
      .subscribe(new Observer(
        this.router,// just un class dans angular
        "/dashboard/my_commande",//target : lin eli machilou
        false,//relode
        false,//swwet alert
        this.sharedService,//obligtoir si ana reload
        this.activeModal
      ).OBSERVER_POST(
      ));
  }
}
