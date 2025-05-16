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
import { StoreMangComponent } from '../popup/store-mang/store-mang.component';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoreManagementComponent implements OnInit {
term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  categoriesList: any[] = []

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getListStore()

  }
  getListStore() {
    this.backendService.get(`${environment.apiUrl + '/magazins'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.categoriesList = response.rows;
      })
    );
  }
  openAdd(){
    const modalRef = this.modalService.open(StoreMangComponent);
    //modalRef.componentInstance.title = "Info Offre"; //aleh hethi ??
    modalRef.componentInstance.add = true;//indiquer au composant qil s'agit d'une operation d'ajout
    modalRef.componentInstance.title = "Add a new Store";// le titre de l'instance du composant
  
  }
  openUpdate(obj:any){
    console.log(obj);
    
    const modalRef = this.modalService.open(StoreMangComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Update Store";
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
        const point = environment.apiUrl + "/roles"
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