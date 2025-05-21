import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

import { UserRoleComponent } from '../popup/user-role/user-role.component';
import { SettingsWebMangComponent } from '../popup/settings-web-mang/settings-web-mang.component';

@Component({
  selector: 'app-settings-web',
  templateUrl: './settings-web.component.html',
  styleUrls: ['./settings-web.component.scss']
})
export class SettingsWebComponent implements OnInit {
term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  settingsList: any[] = []

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getListCatgory()

  }
  getListCatgory() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/settings'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.settingsList = response.rows;
      })
    );
  }
  openAdd(){
    const modalRef = this.modalService.open(SettingsWebMangComponent);
    //modalRef.componentInstance.title = "Info Offre"; //aleh hethi ??
    modalRef.componentInstance.add = true;//indiquer au composant qil s'agit d'une operation d'ajout
    modalRef.componentInstance.title = "Add a new Settings ";// le titre de l'instance du composant
  
  }
  openUpdate(obj:any){
    const modalRef = this.modalService.open(SettingsWebMangComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Update Settings ";
    modalRef.componentInstance.obj = obj;//pour transmettre des donnes a la fenêtre modale qui sera affiche
  
  }
  openDelete(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      closeOnEsc: true,
      closeOnClickOutside: true,
      buttons: ["Cancel", "Confirm"],
    }).then((result) => {
      if (result) {
        const point = environment.apiUrl + "/settings"
        this.backendService
          .delete(`${point}/${id}`)
          .subscribe(
            new Observer(
              this.router,
              null,
              true,
              true,
              this.sharedService,
              null
            ).OBSERVER_DELETE()
          );
      }
    });
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
  
}