import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../service/shared.service';
import { BackendService } from '../../service/backend.service';
import { CartService } from '../../service/cart.service';
import { DataService } from '../../service/data.service';
import Observer from '../../service/observer';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { TokenStorageService } from './../../service/token-storage.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  cartList: any[] = []

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public cartService: CartService,
    public activeModal: NgbActiveModal,
    public TokenStorageService: TokenStorageService,
  ) { }

  ngOnInit() {
    this.cartService.initializeKey();
    this.cartList = this.cartService.getAllElements()
    // alert(this.TokenStorageService.getDecodedUser().userId)
  }

 openValiedeAchatAll() {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to confirm the transition from panel to order?",
      icon: "info",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        // Get all items from the cart
        let myArray = this.cartService.getAllElements();
        let payload = {
          "user": {
            "id": this.TokenStorageService.getDecodedUser().userId
          },
          "orderLines": []
        };
  
        // Construct the payload by pushing each item into the orderLines array
        myArray.forEach(element => {
          payload.orderLines.push({
            "product": {
              "id": element.id
            },
            "quantity": element.qty
          });
        });
        console.log(payload);
        
        // Make the backend call to submit the order
        this.backendService
          .post(`${environment.apiUrl}/orders`, payload)
          .subscribe(new Observer(
            this.router,    // Routing after success
            null,          // Optional: Target for the routing
            true,          // Reload the component
            true,          // Show Sweet Alert on success
            this.sharedService, // Shared service for reloading
            this.activeModal  // Close the modal on success
          ).OBSERVER_POST());
        // Optionally, you can delete the cart after successfully submitting the order
        myArray.forEach(element => {
          this.cartService.deleteElementByKey(element.index);
        });
      }
    });
  }
  
  openValiedeAchatOne(id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to confirm the transition from panel to order?",
      icon: "info",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],

    }).then((result) => {
      if (result) {

        const myObj = this.cartService.getElementByKey(id)

        let payload = {
          "user": {
            "id": this.TokenStorageService.getDecodedUser().userId
          },
          "orderLines":
            [
              {
                "product": {
                  "id": myObj.id
                },
                "quantity": myObj.qty
              }
            ]
        }
        this.backendService
          .post(`${environment.apiUrl}/orders`, payload)
          .subscribe(new Observer(
            this.router,// just un class dans angular
            null,//target : lin eli machilou
            true,//relode
            true,//swwet alert
            this.sharedService,//obligtoir si ana reload
            this.activeModal
          ).OBSERVER_POST());
         this.cartService.deleteElementByKey(id)
      }
    });
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
        this.cartService.deleteElementByKey(id)
      }
    });
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

}