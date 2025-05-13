import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';

@Component({
  selector: 'app-add-commanter',
  templateUrl: './add-commanter.component.html',
  styleUrls: ['./add-commanter.component.scss']
})
export class AddCommanterComponent implements OnInit {
  @Input() title;
  @Input() add;//de l'instance openAdd du composant list-patient
  @Input() obj;
  avisList :any;
  selectedValue:string ;
  selectedText:string ;
  model: any = {}

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private backendService: BackendService,
    public router: Router
  ) { }
  ngOnInit() {
    this.getCommentarirBayOrdersId()
  }
  onChange(event: any) {
    this.selectedValue = event.target.value;
    this.selectedText = event.target.options[event.target.selectedIndex].text;
  }
  async Onsubmit(f:NgForm){
    const payload=
    {
      user: {
        id: this.obj.user.id
      },
      deliveryMan: {
        id: this.obj.deliveryMan.id
      },
      order: {
        id: this.obj.id
      },
      comment: this.selectedText,
      rate: this.selectedValue
    };
    this.backendService
        .post(`${environment.apiUrl}/avis`, payload)
        .subscribe(new Observer(
          this.router,// just un class dans angular
             null,//target : lin eli machilou
             true,//relode
             true,//swwet alert
             this.sharedService,//obligtoir si ana reload
             this.activeModal
          ).OBSERVER_POST());
    }
getCommentarirBayOrdersId(){
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/avis/order'}/${this.obj.id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.avisList = response.rows[0];
        console.log(this.avisList);
        
      })
    );
}
    

}
