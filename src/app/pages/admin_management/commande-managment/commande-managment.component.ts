import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { CategoriesComponent } from '../popup/categories/categories.component';
import { OrdersComponent } from '../popup/orders/orders.component';
import { TokenStorageService } from '../../../service/token-storage.service';

@Component({
  selector: 'app-commande-managment',
  templateUrl: './commande-managment.component.html',
  styleUrls: ['./commande-managment.component.scss']
})
export class CommandeManagmentComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  ordersList: any[] = []
  filteredOrders: any[] = []

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
    this.getListOrders()

  }
  getListOrders() {
    const storeID =this.tokenService.getDecodedUser().userId;
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/orders'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.ordersList = response.rows;
        console.log(this.ordersList);
        
      })
    );
  }

  onStatusSelected(type){
    this.filteredOrders = this.ordersList.filter(order => order.status === type.toString());
  }
  openUpdate(obj:any,status){
    const modalRef = this.modalService.open(OrdersComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Orders management";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
    modalRef.componentInstance.status = status;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  
}