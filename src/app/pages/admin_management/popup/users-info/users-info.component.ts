import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';
import { CloudinaryService } from '../../../../service/cloudinary.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {
  categoriesList: any[] = []
  @Input() title;
  @Input() add;//de l'instance openAdd du composant list-patient
  @Input() obj;
  model: any = {  category: '-1' ,}
  selectedImage: File = null; // To store the selected file
  enable= true ;
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private cloudinaryService: CloudinaryService,
    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
      if(this.obj.role == 'DELIVERYMAN'){
        this.model.firstName = this.obj.firstName;
        this.model.lastName = this.obj.lastName;
        this.model.email = this.obj.email;
        this.model.birthday = this.obj.birthday;
        this.model.phone = this.obj.phone;
        this.model.address = this.obj.address;
      }
      this.model.status = this.obj.status;
  }

  async Onsubmit(f: NgForm) {
      // Editing an existing product, include the image if necessary
      let payload = { ...f.value, patientId: this.obj.id };
      // If an image is selected, upload it to Cloudinary

        // If no image was selected, proceed with the update
        this.backendService
          .put(`${environment.apiUrl}/admin/users/${this.obj.id}`, payload)
          .subscribe(new Observer(
            this.router,
            null,
            true,
            true,
            this.sharedService,
            this.activeModal
          ).OBSERVER_EDIT());
      
  }
  







}

    


