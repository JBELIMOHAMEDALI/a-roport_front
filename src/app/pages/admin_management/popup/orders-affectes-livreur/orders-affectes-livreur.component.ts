import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';

@Component({
  selector: 'app-orders-affectes-livreur',
  templateUrl: './orders-affectes-livreur.component.html',
  styleUrls: ['./orders-affectes-livreur.component.scss']
})
export class OrdersAffectesLivreurComponent implements OnInit {
  @Input() title;
  @Input() id;
  model: any = {}
  delivredList: any[] = []
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,

    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
    this.getListUsers();
  }

  async Onsubmit(f:NgForm){
 
      const payload={...f.value};
    
    this.backendService
        .put(`${environment.apiUrl}/orders/${this.id}/deliveryman/${payload.id_delivery}/${payload.fee}`,null)
        .subscribe(new Observer(
          this.router,// just un class dans angular
             null,//target : lin eli machilou
             true,//relode
             true,//swwet alert
             this.sharedService,//obligtoir si ana reload
             this.activeModal
          ).OBSERVER_POST());

    }
    getListUsers() {
      // const docId = "InnPv3DULUxZZvwYCgym";
      this.backendService.get(`${environment.apiUrl + '/admin/users/role/DELIVERYMAN'}`).subscribe(
        new Observer().OBSERVER_GET((response) => {
          this.delivredList = response.rows;
          console.log(this.delivredList);
        })
      );
    }
    

}
