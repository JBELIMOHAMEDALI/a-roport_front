import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { TokenStorageService } from "./../../../service/token-storage.service";
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../service/shared.service';
import { NgForm } from '@angular/forms';
import { CloudinaryService } from '../../../service/cloudinary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
 editProfile = true;
  editProfileIcon = 'icofont-edit';
  userInfo: any = {}
  doIt =false ;
  editAbout = true;
  editAboutIcon = 'icofont-edit';
  cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dzdsxiaeb/image/upload'; // Cloudinary URL
  uploadPreset = 'ue8wowam'; // Your unsigned upload preset
  imageUrl: string | null = null; // To store the uploaded image URL
  uploadProgress: number | null = null; // To track upload progress
  public basicContent: string;
  model:any={}
  selectedFile = null;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;


  constructor(private backendService: BackendService,
    private tokenService: TokenStorageService,
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private cloudinaryService: CloudinaryService,
    public router: Router,
    private http: HttpClient,


  ) {
  }

  ngOnInit() {
    this.getUserBayId()
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  getUserBayId() {

    this.backendService.get(`${environment.apiUrl + '/admin/users/'}${this.tokenService.getDecodedUser().userId}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.userInfo = response.rows;
        console.log( this.userInfo);

      })
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }


  async uploadImage(): Promise<void> {
    if (!this.selectedFile) return; // Return if no file is selected
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', this.uploadPreset); // Unsigned preset, no authorization required
    try {
      // Start the upload request
      const response = await this.http.post<any>(this.cloudinaryUrl, formData, {
        reportProgress: true,
        observe: 'events',
      }).toPromise();

      // Handle different types of events
      if (response.type === HttpEventType.Response) {
        // Only HttpResponse type has the body field
        this.imageUrl = response.body.url; // Capture the uploaded image URL
        this.uploadProgress = null; // Reset the progress
        this.selectedFile = null; // Clear the selected file
      }
    } catch (error) {
      console.error('Upload failed', error);
      this.uploadProgress = null; // Reset progress on error
    }
  }
  async upadateUser() {
    this.doIt=true ;
    let payload = {}

    if (this.selectedFile) {
      await this.uploadImage();
      localStorage.setItem("imgProfile",this.imageUrl)
      payload =  {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        email: this.userInfo.email,
        imagePath: this.imageUrl,
        address: this.userInfo.address,
        phone: this.userInfo.phone,
        status: 1,
      }
      // payload.imagePath = this.imageUrl; // Set the uploaded image URL
     await this.backendService
      .put(`${environment.apiUrl}/admin/users/${this.userInfo.id}`, payload)
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
      this.doIt =false ;
    }else{
      payload =  {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        email: this.userInfo.email,
        address: this.userInfo.address,
        phone: this.userInfo.phone,
        status: 1,
      }
     await this.backendService
        .put(`${environment.apiUrl}/admin/users/${this.userInfo.id}`, payload)
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
this.doIt =false ;
    }


  }
  changePassword(f:NgForm){
    const payload={currentPassword:f.value.currentPassword,newPassword:f.value.newPassword,userId:this.tokenService.getDecodedUser().userId};
    console.log(payload);
        this.backendService
            .post(`${environment.apiUrl}/auth/update-password`, payload)
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