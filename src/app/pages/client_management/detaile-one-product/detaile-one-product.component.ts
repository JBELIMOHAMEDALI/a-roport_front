import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../service/cart.service';
import swal from 'sweetalert';
import { AddToCaredProductComponent } from '../poupup/add-to-cared-product/add-to-cared-product.component';

@Component({
  selector: 'app-detaile-one-product',
  templateUrl: './detaile-one-product.component.html',
  styleUrls: ['./detaile-one-product.component.scss']
})
export class DetaileOneProductComponent implements OnInit {
  proudactObject: any = {}; // Initialize proudactObject to an empty object
  id:any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public cartService: CartService,

  ) { }
  ngOnInit() {

    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // 'id' is the name of the route parameter
      // console.log(this.productId);
    });
    this.getProduct();
  }
  getProduct() {
    this.backendService.get(`${environment.apiUrl + '/products'}/${this.id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.proudactObject = response.rows;
        console.log(this.proudactObject);
      })
    );
  }

  addToCared(){
    const modalRef = this.modalService.open(AddToCaredProductComponent);
    modalRef.componentInstance.obj = this.proudactObject;//indiquer au composant qil s'agit d'une operation d'ajout
    modalRef.componentInstance.title = "Add to Cart";//

  }
}
