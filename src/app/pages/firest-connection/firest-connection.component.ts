import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { BackendService } from "../../service/backend.service";
import Observer from "../../service/observer";
import { environment } from "../../../environments/environment";
import { TokenStorageService } from "../../service/token-storage.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-firest-connection',
  templateUrl: './firest-connection.component.html',
  styleUrls: ['./firest-connection.component.scss']
})
export class FirestConnectionComponent implements OnInit {

  constructor(

    private backendService: BackendService,
    private router: Router,
    private tokenService: TokenStorageService,
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
  }
  async Onsubmit(f: NgForm) {
    const { otp } = f.value;
    const id = this.tokenService.getDecodedUser().userId;
    this.backendService
      .post(`${environment.apiUrl}/admin/verify-otp?userId=${id}&otp=${otp}`, null)
      .subscribe(new Observer(
        this.router,// just un class dans angular
        "/dashboard",//target : lin eli machilou
        false,//relode
        false,//swwet alert
        this.sharedService,//obligtoir si ana reload
        this.activeModal
      ).OBSERVER_POST((response,success:boolean)=>{
        if(success){
          // localStorage.
          this.tokenService.saveToken(response.rows)
        }
      }));
  }
}
