import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  constructor(private http: HttpClient) { }

  // Method to upload an image to Cloudinary
  // uploadImage(image: File): Observable<any> {
  //   const url = `https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/image/upload`;
  
  //   const formData = new FormData();
  //   formData.append('file', image);
  //   formData.append('upload_preset', environment.cloudinaryUploadPreset);
  //     return this.http.post(url, formData); // No headers needed
  // }
  uploadImage(image: File): Observable<any> {
    const url = `https://api/v1_1/${environment.cloudinaryCloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', environment.cloudinaryUploadPreset);
    return this.http.post(url, formData); // Make a direct request to Cloudinary
  }
  
}