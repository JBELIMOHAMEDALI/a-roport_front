import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersAffectesLivreurComponent } from '../orders-affectes-livreur/orders-affectes-livreur.component';

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

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(typeof(this.obj)
    );
    
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

  openAffected(id: number) {
    // Open the modal for OrdersAffectesLivreurComponent
    this.activeModal.close();
    const modalRef = this.modalService.open(OrdersAffectesLivreurComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Orders management";
    modalRef.componentInstance.id = id;

    }
}