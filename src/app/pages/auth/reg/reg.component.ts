import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendService } from "../../../service/backend.service";
import Observer from "../../../service/observer";
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  registred = false;
  mayFile: any;
  paylodFormData: FormData;
  maxDate: string;

  constructor(private backendService: BackendService, public router: Router) {
    this.paylodFormData = new FormData();
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
  }

  ngOnInit() {
  }
  signup(form: NgForm) {
    let payload = { ...form.value };
    const obj2 = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      birthday: payload.birthday,
      phone: payload.phone,
      address: payload.address,
      imagePath: "http://res.cloudinary.com/dzdsxiaeb/image/upload/v1729758946/gntphciuyt0vornequgf.jpg",
      role: "CLIENT",
      status:1
    };
    this.backendService
      .post(`${environment.apiUrl}/auth/register`, obj2)
      .subscribe(
        new Observer(this.router, "/signin", false, true).OBSERVER_POST(
          (response: any, registred) => {
            if (registred) {
              this.router.navigate(["/signin"]);
              return;
            }
            this.registred = false;
          }
        )
      );
    // this.router.navigate(['log'])
  }
  

}
