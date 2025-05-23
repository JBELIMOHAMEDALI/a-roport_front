import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../service/shared.service';
import { BackendService } from '../../service/backend.service';
import Observer from '../../service/observer';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {
model:any
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  order: any
  filteredOrders: any[] = []
id:any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
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
    this.backendService.get(`${environment.apiUrl + '/orders/'+this.id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.order = response.rows;
        console.log(this.order);
        
      })
    );
  }
}
