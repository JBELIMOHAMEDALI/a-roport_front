import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { CategoriesComponent } from '../popup/categories/categories.component';

@Component({
  selector: 'app-categories-account-management',
  templateUrl: './categories-account-management.component.html',
  styleUrls: ['./categories-account-management.component.scss']
})
export class CategoriesAccountManagementComponent implements OnInit {
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
    this.getListCatgory()

  }
  getListCatgory() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/categories'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.categoriesList = response.rows;
      })
    );
  }
  openAdd(){
    const modalRef = this.modalService.open(CategoriesComponent);
    //modalRef.componentInstance.title = "Info Offre"; //aleh hethi ??
    modalRef.componentInstance.add = true;//indiquer au composant qil s'agit d'une operation d'ajout
    modalRef.componentInstance.title = "Add a new Categorie";// le titre de l'instance du composant
  
  }
  openUpdate(obj:any){
    const modalRef = this.modalService.open(CategoriesComponent);
    modalRef.componentInstance.add = false;
    modalRef.componentInstance.title = "Update Categorie";
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
        const point = environment.apiUrl + "/categories"
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