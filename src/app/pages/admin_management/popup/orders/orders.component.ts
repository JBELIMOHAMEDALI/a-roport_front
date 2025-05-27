import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';
import { TokenStorageService } from "./../../../../service/token-storage.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @Input() name: string;
  @Input() obj: any; // Make sure the obj is correctly typed or use `any` if unsure
  @Input() status: any; // Make sure the obj is correctly typed or use `any` if unsure
  somme = 0;
  sommeTTc = 0;
  userRole = this.tokenService.getDecodedUser()

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public sharedService: SharedService,
    private tokenService: TokenStorageService,

        private backendService: BackendService,
        public router: Router
  ) { }

  ngOnInit() {
console.log(this.userRole.role);

    
    // Check if obj and obj.orderLines exist
    if (this.obj && this.obj.orderLines) {
      this.obj.orderLines.forEach(element => {
        this.somme += element.totalPriceTTC;
      });
     this.sommeTTc = this.somme ;
      if(this.obj.deliveryFee !=null){

        this.somme +=this.obj.deliveryFee
      }

    } else {
      console.error("obj or obj.orderLines is undefined");
    }
  }

  openAffected(id: number,stat) {
    // Open the modal for OrdersAffectesLivreurComponent
 this.backendService
        .put(`${environment.apiUrl}/orders/${id}/${stat}`,null)
        .subscribe(new Observer(
          this.router,// just un class dans angular
             null,//target : lin eli machilou
             true,//relode
             true,//swwet alert
             this.sharedService,//obligtoir si ana reload
             this.activeModal
          ).OBSERVER_POST());

    }

    }
