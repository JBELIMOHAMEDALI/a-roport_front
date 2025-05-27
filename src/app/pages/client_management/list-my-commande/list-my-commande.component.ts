import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { DatePipe } from '@angular/common';
import { ProductInfoComponent } from '../../admin_management/popup/product-info/product-info.component';
import { OrdersComponent } from '../../admin_management/popup/orders/orders.component';
import { AddCommanterComponent } from '../poupup/add-commanter/add-commanter.component';
import { TokenStorageService } from "./../../../service/token-storage.service";

@Component({
  selector: 'app-list-my-commande',
  templateUrl: './list-my-commande.component.html',
  styleUrls: ['./list-my-commande.component.scss'],
  providers: [DatePipe]
})
export class ListMyCommandeComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  ordersList: any[] = []
  ordersListOled: any[] = []
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public activeModal: NgbActiveModal,
    private tokenService: TokenStorageService

  ) { }

  ngOnInit() {

    this.getListOrders()

  }
  getListOrders() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/orders/user'}/${this.tokenService.getDecodedUser().userId}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.ordersList = response.rows;
      })
    );
  }
  filterOrdersByStatus(orders: any[], status: number): any[] {
    if (status === -1) {
      // If status is -1, return the full list
      return orders;
    }

    // Filter the orders based on the status
    let filteredOrders: any[] = [];
    orders.forEach(element => {
      if (element.status === status) {
        filteredOrders.push(element);
      }
    });

    return filteredOrders;
  }
  onFilterSelected(type: number) {
    if (type != -1) {
      this.ordersList = this.filterOrdersByStatus(this.ordersListOled, type);
    }
    else {
      this.getListOrders()
    }
  }
  openDelete(id) {
    swal({
      title: "Are you sure ?",
      text: "You want to cancel this order!",
      icon: "warning",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        let payload = {}
        const point = environment.apiUrl + "/categories"
        this.backendService
          .put(`${environment.apiUrl}/orders/${id}/3`, payload)
          .subscribe(
            new Observer(
              this.router,
              null,
              true,
              true,
              this.sharedService,
              this.activeModal
            ).OBSERVER_EDIT()
          );
      }
    });
  }
  openInfo(obj) {
    const modalRef = this.modalService.open(OrdersComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Orders Info";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche

  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  openFacture(id) {
    this.router.navigate(["/dashboard/facture", id])
  }
  openValidateResVeCMD(id) {
    swal({
      title: "Are you sure ?",
      text: "You want to confirm that the order is received !",
      icon: "info",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        let payload = {}
        this.backendService
          .put(`${environment.apiUrl}/orders/${id}/6`, payload)
          .subscribe(
            new Observer(
              this.router,
              null,
              true,
              true,
              this.sharedService,
              this.activeModal
            ).OBSERVER_EDIT()
          );
      }
    });
  }
  openAddCommanter(obj) {
    const modalRef = this.modalService.open(AddCommanterComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Orders Info";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche

  }
  // AddCommanterComponent
}