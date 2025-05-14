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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  categoriesList: any[] = []
  @Input() title;
  @Input() add;//de l'instance openAdd du composant list-patient
  @Input() obj;
  model: any = {  category: '-1' ,}
  selectedImage: File = null; // To store the selected file
  maxDate: string;
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private cloudinaryService: CloudinaryService,
    private backendService: BackendService,
    public router: Router
  ) { }


  ngOnInit() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    if (this.add) {
      this.model = {};
    } else {

      this.model.category = this.obj.category.id;
      this.model.name = this.obj.name;
      this.model.price = this.obj.price;
      this.model.tva = this.obj.tva*100;
      // this.model.name = this.obj.name;
    }
  }

  async Onsubmit(f: NgForm) {
    if (this.add) {
      let payload = { ...f.value,role: "STOR",password:"%Azerty123",imagePath:"http://res.cloudinary.com/dzdsxiaeb/image/upload/v1729759186/uiezd5rg5lls97v4bf7p.png" };

      this.backendService
      .post(`${environment.apiUrl}/auth/register`, payload)
      .subscribe(new Observer(
        this.router,
        null,
        true,
        true,
        this.sharedService,
        this.activeModal
      ).OBSERVER_POST());
  
    } else {
      // Editing an existing product, include the image if necessary
      let payload = { ...f.value, patientId: this.obj.id };
      payload.category = {
        "id": payload.category
      };
      payload.tva = payload.tva / 100;
  
      // If an image is selected, upload it to Cloudinary
      if (this.selectedImage) {
        this.cloudinaryService.uploadImage(this.selectedImage).subscribe(
          (response) => {
            payload.img = response.secure_url; // Store Cloudinary image URL in the payload
  
            // Proceed with the update to your backend
            this.backendService
              .put(`${environment.apiUrl}/products/${this.obj.id}`, payload)
              .subscribe(new Observer(
                this.router,
                null,
                true,
                true,
                this.sharedService,
                this.activeModal
              ).OBSERVER_EDIT());
          },
          (error) => {
            console.error('Image upload failed:', error);
          }
        );
      } else {
        // If no image was selected, proceed with the update
        this.backendService
          .put(`${environment.apiUrl}/products/${this.obj.id}`, payload)
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
  }
  







}

    


