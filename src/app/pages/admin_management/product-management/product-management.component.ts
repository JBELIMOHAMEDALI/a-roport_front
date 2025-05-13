import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import { DataService } from '../../../service/data.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { TokenStorageService } from './../../../service/token-storage.service';
import { CategoriesComponent } from '../popup/categories/categories.component';
import { ProductComponent } from '../popup/product/product.component';
import { ProductInfoComponent } from '../popup/product-info/product-info.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  productsList: any[] = []
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getListProducts()

  }
  getListProducts() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/products'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.productsList = response.rows;
      })
    );
  }
  openAdd(){
    const modalRef = this.modalService.open(ProductComponent);
    //modalRef.componentInstance.title = "Info Offre"; //aleh hethi ??
    modalRef.componentInstance.add = true;//indiquer au composant qil s'agit d'une operation d'ajout
    modalRef.componentInstance.title = "Add a new Product";// le titre de l'instance du composant
  
  }
  openUpdate(obj:any){
    const modalRef = this.modalService.open(ProductComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Update Product";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  
  }
  openDelete(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        const point = environment.apiUrl + "/products"
        this.backendService
          .delete(`${point}/${id}`)
          .subscribe(
            new Observer(
              this.router,
              null,
              true,
              true,
              this.sharedService,
              null
            ).OBSERVER_DELETE()
          );
      }
    });
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  openInfo(item){
    const modalRef = this.modalService.open(ProductInfoComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = "Info Product";// le titre de l'instance du composant
    modalRef.componentInstance.obj = item;// le titre de l'instance du composant
  
  }
  openImageModal(imagePath: string, content: any) {
    this.selectedImage = imagePath;
    this.modalService.open(content, { centered: true });
  }
  
}