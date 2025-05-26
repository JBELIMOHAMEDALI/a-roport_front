import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../service/shared.service';
import { BackendService } from '../../service/backend.service';
import Observer from '../../service/observer';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { TokenStorageService } from '../../service/token-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {
  model: any
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  order: any
  filteredOrders: any[] = []
  id: any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public activeModal: NgbActiveModal,


    private tokenService: TokenStorageService,
  ) { }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // 'id' is the name of the route parameter
      // console.log(this.productId);
    });
    this.getOrder();
  }
  getOrder() {
    this.backendService.get(`${environment.apiUrl + '/orders/' + this.id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.order = response.rows;
        console.log(this.order);

      })
    );
  }
  async Onsubmit(f: NgForm) {

    let payload = { ...f.value };
    console.log(payload);

  }
  sendOtp(id_order, id_user) {
    this.backendService
      .post(`${environment.apiUrl}/orders/${id_order}/payment/send-otp?userId=${id_user}`, null)
      .subscribe(new Observer(
        this.router,// just un class dans angular
        null,//target : lin eli machilou
        false,//relode
        false,//swwet alert
        this.sharedService,//obligtoir si ana reload
        this.activeModal
      ).OBSERVER_POST());
  }
  submitData() {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to confirm the payment?",
      icon: "info",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        // Get all items from the cart
        this.sendOtp(this.id, this.tokenService.getDecodedUser().userId)
        swal({
          title: "Are you sure?",
          text: "We will send a verification code to your email for the payment processing. Please validate it to complete the process.",
          icon: "info",
          closeOnEsc: true,
          closeOnClickOutside: true,
          buttons: ["Cancel", "Confirm"],
        }).then((result) => {
          if (result) {
           this.router.navigate(['/'])

          }
        });
      }
    });
  }

}
