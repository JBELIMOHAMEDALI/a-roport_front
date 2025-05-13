import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() title;
  @Input() add;//de l'instance openAdd du composant list-patient
  @Input() obj;
  model: any = {}

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,

    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
    if (this.add) {
      this.model = {};
    } else {

      this.model.name = this.obj.name;
    }
  }

  async Onsubmit(f:NgForm){
    if(this.add){
      const payload={...f.value};
    
    this.backendService
        .post(`${environment.apiUrl}/categories`, payload)
        .subscribe(new Observer(
          this.router,// just un class dans angular
             null,//target : lin eli machilou
             true,//relode
             true,//swwet alert
             this.sharedService,//obligtoir si ana reload
             this.activeModal
          ).OBSERVER_POST());
    }else{
      //cree un obj payload comme lajout mais inclut l'id du patient
      let payload = { ...f.value,patientId:this.obj.id};
    this.backendService
      .put(`${environment.apiUrl}/categories/${this.obj.id}`, payload)
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
    }

    

}
