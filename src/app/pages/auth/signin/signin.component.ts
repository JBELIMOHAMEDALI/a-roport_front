import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { BackendService } from "../../../service/backend.service";
import Observer from "../../../service/observer";
import { environment } from "../../../../environments/environment";
import { TokenStorageService } from "../../../service/token-storage.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {

  id_medcien = null;
  loggedIn = false;
  list_medcien: any
  pationChose = false
  constructor(
    private backendService: BackendService,
    private router: Router,
    private tokenService: TokenStorageService,
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
  }
  sendOtp(id){
    this.backendService
    .post(`${environment.apiUrl}/admin/users/${id}/send-otp`, null)
    .subscribe(new Observer(
      this.router,// just un class dans angular
         null,//target : lin eli machilou
         false,//relode
         false,//swwet alert
         this.sharedService,//obligtoir si ana reload
         this.activeModal
      ).OBSERVER_POST());
  }
  login(form: NgForm) {
    this.loggedIn = true;
    const payload = { ...form.value };
    this.backendService
      .post(`${environment.apiUrl}/auth/login`, payload)
      .subscribe(
        new Observer(this.router, null, false).OBSERVER_SIGNINFIRESTCONNECTION(
          (response: any, loggedIn: boolean) => {
            localStorage.setItem("imgProfile",response.rows.imagePath)
            if(response.rows.magazins.length >0){
                          localStorage.setItem("magazins_id",response.rows.magazins[0].id)

            }
            this.loggedIn = false;
            if (loggedIn) {
              if(!response.rows.connectionOtp){this.sendOtp(response.rows.id)}
              this.tokenService.saveToken(response.rows.token);
              const target = !response.rows.connectionOtp ? '/firest_Connection' : '/dashboard'
              this.router.navigate([target]);
              return;
            }
          }
        )
      );
  }







}
