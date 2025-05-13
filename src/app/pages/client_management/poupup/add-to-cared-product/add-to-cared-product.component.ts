import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';
import { CartService } from '../../../../service/cart.service';
import swal from "sweetalert";

@Component({
  selector: 'app-add-to-cared-product',
  templateUrl: './add-to-cared-product.component.html',
  styleUrls: ['./add-to-cared-product.component.scss']
})
export class AddToCaredProductComponent implements OnInit {
  @Input() title;
  @Input() obj;
  model: any = {}

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    public cartService: CartService,
    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
  }

  async Onsubmit(f: NgForm) {
    const qte = { ...f.value };

    const payload = { id: this.obj.id, name: this.obj.name, price: this.obj.price, tva: this.obj.tva, category: this.obj.category.name, qty: qte.quantity, ttprice: this.obj.priceWithTva, img: this.obj.imagePath, }
    this.cartService.addElementToArray(payload)
    this.activeModal.close();
    swal("Success!", "Add to cart successfully", "success");
    this.router.navigate(["/dashboard/my_cart"])


  }
}
