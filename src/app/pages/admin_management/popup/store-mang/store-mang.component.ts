import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../../../../service/backend.service';
import { SharedService } from '../../../../service/shared.service';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import Observer from '../../../../service/observer';
import { CloudinaryService } from '../../../../service/cloudinary.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-store-mang',
  templateUrl: './store-mang.component.html',
  styleUrls: ['./store-mang.component.scss']
})
export class StoreMangComponent implements OnInit {
 storUserList: any[] = [];
  @Input() title: string;
  @Input() add: boolean; // Determines whether to add a new product
  @Input() obj: any; // Data object for product editing

  selectedFile: File | null = null;
  cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dzdsxiaeb/image/upload'; // Cloudinary URL
  uploadPreset = 'ue8wowam'; // Your unsigned upload preset
  imageUrl: string | null = null; // To store the uploaded image URL
  uploadProgress: number | null = null; // To track upload progress
  model: any = { category: '-1' }; // Initialize model object for form data

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private cloudinaryService: CloudinaryService,
    private backendService: BackendService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getListCategory(); // Fetch categories on component initialization
    if (this.add) {
      this.model = {}; // New product
    } else {
      this.populateProductDetails(); // Populate model if editing an existing product
    }
  }

  // Fetch list of categories
  getListCategory() {
    this.backendService.get(`${environment.apiUrl + '/admin/users/role/2'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.storUserList = response.rows;
      })
    );
  }

  // Populate product details when editing
  populateProductDetails() {
    this.model.userId = this.obj.createdById;
    this.model.name = this.obj.name;
    this.model.description = this.obj.description;
    this.model.address = this.obj.address;
  }
  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
    }
  }

  // Upload the selected file to Cloudinary
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
  // Handle form submission
  async Onsubmit(f: NgForm) {
    let payload = { ...f.value };
    // Ensure image upload before proceeding
    if (this.selectedFile) {
      await this.uploadImage(); // Wait for image upload to complete
      payload.image = this.imageUrl; // Set the uploaded image URL
    } else if (!this.add && this.imageUrl) {
      payload.image = this.imageUrl; // Use the existing image URL for edits
    } else {
      payload.image = null; // No image uploaded or present
    }

    // Adjust other payload values
    // Differentiate between adding and editing a product
    if (this.add) {
      this.backendService
        .post(`${environment.apiUrl}/magazins`, payload)
        .subscribe(
          new Observer(
            this.router,
            null,
            true,
            true,
            this.sharedService,
            this.activeModal
          ).OBSERVER_POST()
        );
    } else {

      if (this.selectedFile) {
        await this.uploadImage(); // Wait for image upload to complete
        payload.image = this.imageUrl; // Set the uploaded image URL
      } else if (!this.add && this.imageUrl) {
        payload.image = this.imageUrl; // Use the existing image URL for edits
      } else {
        payload.image = null; // No image uploaded or present
      }
      payload.tva = payload.tva / 100;
      this.backendService
        .put(`${environment.apiUrl}/magazins/${this.obj.id}`, payload)
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