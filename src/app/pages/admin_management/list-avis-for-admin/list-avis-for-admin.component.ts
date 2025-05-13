import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../service/shared.service';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-list-avis-for-admin',
  templateUrl: './list-avis-for-admin.component.html',
  styleUrls: ['./list-avis-for-admin.component.scss']
})
export class ListAvisForAdminComponent implements OnInit {
  term: any;
  p: number;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  avisList: any[] = []
  categoriesList: any[] = []

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sahredserv: SharedService,
    private modalService: NgbModal,
    private backendService: BackendService,
    public sharedService: SharedService,
    public cartService: CartService,
  ) { }

  ngOnInit() {
    this.getListProduct()
  }

  getListProduct() {
    this.backendService.get(`${environment.apiUrl + '/avis'}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.avisList = response.rows;
        let mayList: any[] = [];
        let deliveryManMap: { [key: string]: any } = {};  // Map to store delivery men by their ID
  
        this.avisList.forEach(element => {
          let deliveryManId = element.deliveryMan.id;
  
          if (deliveryManMap[deliveryManId]) {
            // If delivery man already exists, sum the rate
            deliveryManMap[deliveryManId].rate += element.rate / 5;
          } else {
            // If delivery man doesn't exist, create a new entry
            deliveryManMap[deliveryManId] = {
              deliveryManId: deliveryManId,
              deliveryManFullName: element.deliveryMan.lastName + ' ' + element.deliveryMan.firstName,
              deliveryManImg: element.deliveryMan.imagePath,
              rate: element.rate / 5 // Normalize rate to be between 0 and 5
            };
          }
        });
  
        // Convert the map to a list
        mayList = Object.values(deliveryManMap);
        this.avisList = mayList;
        console.log(mayList); // This will log the consolidated list with summed rates for duplicates
      })
    );
  }
  
  calculateStarRating(rate: number) {
    const fullStars = Math.floor(rate); // Full stars (e.g., 3)
    const halfStar = rate % 1 >= 0.5 ? true : false; // Half star if remainder is >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return { fullStars, halfStar, emptyStars };
  }

  openDetails(item: any) {
    this.router.navigate(["/dashboard/avisAdminDetailse", item])
  }
}