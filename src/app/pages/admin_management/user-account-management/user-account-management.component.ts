import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { TokenStorageService } from './../../../service/token-storage.service';
import { UsersComponent } from '../popup/users/users.component';
import { UsersInfoComponent } from '../popup/users-info/users-info.component';
import { InfoUserComponent } from '../popup/info-user/info-user.component';

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.scss']
})
export class UserAccountManagementComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  listtUsers: any[] = []
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getListUsers()

  }
  getListUsers() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/admin/users'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.listtUsers = response.rows;
      })
    );
  }
  getListUsersByRole(role: string) {
    this.backendService.get(`${environment.apiUrl + '/admin/users/role'}/${role}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.listtUsers = response.rows;
      })
    );
  }
  onRoleSelected(role) {
    if (role == 1) { this.getListUsers() }
    if (role == "USER") { this.getListUsersByRole("USER") }
    if (role == "DELIVERYMAN") { this.getListUsersByRole("DELIVERYMAN") }

  }
  openAdd(){
    const modalRef = this.modalService.open(UsersComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Add Delivery Man";
    modalRef.componentInstance.add = true;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  }
  openUpdate(obj){
    const modalRef = this.modalService.open(UsersInfoComponent);
    modalRef.componentInstance.title = "Update Users";
    modalRef.componentInstance.add = false;//pour transmettre des donnes a la fenêtre modale qui sera affiche
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  }
  openUpdateUser(obj){
    const modalRef = this.modalService.open(UsersInfoComponent);
    modalRef.componentInstance.title = "Update Users";
    modalRef.componentInstance.add = false;//pour transmettre des donnes a la fenêtre modale qui sera affiche
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  }
  openInfo(obj){
    const modalRef = this.modalService.open(InfoUserComponent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.title = "Info User";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }



}