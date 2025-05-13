import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  factureInfo:any[]=[];
  objOrderes:any={}
  ordresId:string;
  sommeTTC =0;
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.ordresId = params.get('id')!;
    });
    this.getOneOrderesBayId(this.ordresId);
  }
  calculateRoundedTotal(pra){}

  getOneOrderesBayId(id) {
    this.backendService.get(`${environment.apiUrl + '/orders/'}${id}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.objOrderes = response.rows;
        console.log(this.objOrderes.deliveryFee);
        
        this.objOrderes.orderLines.forEach(element => {
          this.sommeTTC += element.totalPriceTTC;
          
        });
   
        
      })
    );
  }

}
