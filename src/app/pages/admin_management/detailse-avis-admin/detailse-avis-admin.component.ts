import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { CartService } from '../../../service/cart.service';
import { TokenStorageService } from './../../../service/token-storage.service';

@Component({
  selector: 'app-detailse-avis-admin',
  templateUrl: './detailse-avis-admin.component.html',
  styleUrls: ['./detailse-avis-admin.component.scss']
})
export class DetailseAvisAdminComponent implements OnInit {
  listAvis: any[] = []
  deliveryMan: any ={}
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  deliveryId:string =""
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public cartService: CartService,
    public TokenStorageService: TokenStorageService,

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deliveryId = params.get('id')!;
    });
    this.getListAviForDeliveryMan(this.deliveryId)
  }

  getListAviForDeliveryMan(id) {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/avis/deliveryman/'}${id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.listAvis = response.rows;
        this.deliveryMan =this.listAvis[0].deliveryMan;
        console.log(this.listAvis[0].order.id        );
      })
    );
  }

  calculateStarRating(rate: number) {
    const fullStars = Math.floor(rate); // Full stars (e.g., 3)
    const halfStar = rate % 1 >= 0.5 ? true : false; // Half star if remainder is >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return { fullStars, halfStar, emptyStars };
  }

}
