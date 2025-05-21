import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  magazins: any[] = []
  product: any[] = []
  catogry: any[] = []
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }
  id: string | null = null;

  // constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getListStore()
    this.getListProduct()
    this.getListCatgory()
    // alert('Shop ID:'+ this.id);
  }


  getListStore() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/magazins/'}` + this.id).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.magazins = response.rows;
        console.log(this.magazins);

      })
    );
  }

  getListCatgory() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/categories/magazin/'}` + this.id).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.catogry = response.rows;
      })
    );
  }

    getListProduct() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/products/filter?magazinId='}` + this.id).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.product = response.rows;
      })
    );
  }

      getListProductByMagAndCat(id) {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/products/filter?magazinId='}` + this.id+'&categoryId='+id).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.product = response.rows;
      })
    );
  }

  check_if_connected() {
    const token = localStorage.getItem('auth-token');

    if (token == null) {
      // Token exists and is not empty

      swal({
        title: "Authentication Required",
        text: "You must be logged in to place an order or add a product to your cart.",
        icon: "info",
        closeOnEsc: true,
        closeOnClickOutside: true,
        buttons: ["Cancel", "Login"],
      }).then((result) => {
        if (result) {
          // Redirect or show login
          this.router.navigate(['/login']);
        }
      });

    }

  }

  onChange(event){
if (event == "-1"){
  this.getListProduct()
}else{
  this.getListProductByMagAndCat(event)
}
  }
}
