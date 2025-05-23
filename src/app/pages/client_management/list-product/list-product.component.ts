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
import { AddToCaredProductComponent } from '../poupup/add-to-cared-product/add-to-cared-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  proudactList: any[] = []
  categoriesList: any[] = []
  catogry: any[] = []
  store: any[] = []
  storeIdSelected:any
categoryFilterDisabled: boolean = true;

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
    this.getListProduct()
    this.getListCatgory()
    this.getListStore()


  }
  getListProduct() {
    this.backendService.get(`${environment.apiUrl + '/products'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.proudactList = response.rows;
      })
    );
  }
  onRoleSelected(categories) {
    if (categories == -2) {
      this.getListProduct()
    } else {
      this.getListProductBayCatgory(categories)
    }
  }

  getListProductBayCatgory(categories) {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/products/category'}/${categories}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        console.log(response);

        this.proudactList = response.rows;
      })
    );
  }
  getListCatgory() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/categories'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        console.log(response);

        this.catogry = response.rows;
      })
    );
  }



  openDetails(item) {
    this.router.navigate(["/dashboard/detaile_one_product", item])
  }
// onChange(id){
//   if (id == "-1"){
//   this.getListProduct()
// }else{
//   // this.getListProductByMagAndCat(event)
// }
// }
    getListStore() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/magazins'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.store = response.rows;
      })
    );
  }

getListProductByStoreAndCategory(store: string, category?: string): void {
  let URL =""
  if (category) {
    URL =`${environment.apiUrl + '/products/filter?magazinId='}` + store+'&categoryId='+category ;
    // Call API or filter with category
  } else {
    URL = `${environment.apiUrl + '/products/filter?magazinId='}` + store
    // Call API or filter without category
  }


   this.backendService.get(URL).subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.proudactList = response.rows;
        })
      );
}


onChangeStore(storeId: string) {
  if (storeId !== "-1") {
   
    this.categoryFilterDisabled = false;
    this.storeIdSelected = storeId
    this.getListProductByStoreAndCategory(storeId)
    
  } else {
    this.getListProduct()
    this.categoryFilterDisabled = true;

  }
}

onChange(category){
  if (category !== "-1") {
   
    this.getListProductByStoreAndCategory(this.storeIdSelected,category)
    
  } else {
    this.getListProduct()
    this.categoryFilterDisabled = true;

  }

}



}
