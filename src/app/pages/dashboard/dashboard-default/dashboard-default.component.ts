import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import { BackendService } from '../../../service/backend.service';
import Observer from '../../../service/observer';
import { environment } from '../../../../environments/environment';
import { TokenStorageService } from "./../../../service/token-storage.service";

declare const AmCharts: any;

declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.scss',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardDefaultComponent implements OnInit,AfterViewInit  {
  totalValueGraphData1 = buildChartJS('#fff', [45, 25, 35, 20, 45, 20, 40, 10, 30, 45], '#3a73f1', 'transparent');
  totalValueGraphData2 = buildChartJS('#fff', [10, 25, 35, 20, 10, 20, 15, 45, 15, 10], '#e55571', 'transparent');
  totalValueGraphOption = buildChartOption();
  userLoggedIn
  UserCount = 0;
  OrderCount = 0;
  CategoryCount = 0;
  ProductCount = 0;
  ordersListLivreur: any[] = []
  Delivered = 0 ;
  Shipped = 0 ;
  Received = 0 ;
  Canceled = 0 ;

  Deliveredliv = 0 ;
  Shippedliv = 0 ;
  Receivedliv = 0 ;
  Canceledliv = 0 ;

  erour = false;
  currentYear: number = null;
  selectedYear: number = null;
  selectedStatus: string = 'Pending'; // Initialize with a default status
  chart: any;
  years: number[] = [2024, 2023, 2022]; // Example years
  statuses: string[] = ['Pending', 'Approved', 'Rejected']; // Example statuses
  datachart: any[] = []; // Will hold the chart data

  constructor(private backendService: BackendService
    ,    private tokenService: TokenStorageService

  ) {}

  ngOnInit() {
    this.userLoggedIn = this.tokenService.getDecodedUser();
    if(this.userLoggedIn.role==='ADMIN'){  
    this.getUserCount();
    this.getCategoryCount();
    this.getProductCount();
    this.getOrderCount();

    this.currentYear = new Date().getFullYear();
    this.selectedYear = this.currentYear; // Initialize with the current year
    this.initChart();
    this.getStatistiqueAll(); // Load default data on initialization
  }
  if(this.userLoggedIn.role==='USER'){
      this.getUsersCount()
  }
  if(this.userLoggedIn.role=='DELIVERYMAN'){
    this.getListOrdersLiv()
}
  
  }


  getUsersCount() {
    this.backendService.get(`${environment.apiUrl}/orders/userCount/${this.tokenService.getDecodedUser().userId}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        let data:any []=[]
          data =response.rows
          data.forEach(element => {
              if(element.status == 'Shipped'){ this.Shipped = element.count}
              if(element.status == 'Delivered'){ this.Delivered = element.count}
              if(element.status == 'Canceled'){ this.Canceled = element.count}
              if(element.status == 'Received'){ this.Received = element.count}
;
          });
          
          
      })
    );
  }


  getListOrdersLiv() {
    // const docId = "InnPv3DULUxZZvwYCgym";
    this.backendService.get(`${environment.apiUrl + '/orders/deliveryman/'}${this.tokenService.getDecodedUser().userId}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.ordersListLivreur = response.rows;

        this.ordersListLivreur.forEach(element => {
          if (element.status === 1) { this.Shippedliv += 1; }
          if (element.status === 2) { this.Deliveredliv += 1; }
          if (element.status === 3) { this.Canceledliv += 1; }
          if (element.status === 4) { this.Receivedliv += 1; }
        });
        console.log(this.ordersListLivreur);
        
      })
    );
  }



  ngAfterViewInit() {
    if(this.userLoggedIn.role==='ADMIN'){ 
    this.initChart(); // Initialize the chart after the view has been rendered
    this.getStatistiqueAll(); // Load initial data for the chart
    }
  }
  // Initialize the chart
  initChart() {
    this.chart = AmCharts.makeChart('statistics-chart', {
      type: 'serial',
      marginTop: 0,
      marginRight: 0,
      dataProvider: this.datachart, // Initially empty
      valueAxes: [
        {
          axisAlpha: 0,
          dashLength: 6,
          gridAlpha: 0.1,
          position: 'left'
        }
      ],
      graphs: [
        {
          id: 'g1',
          bullet: 'round',
          bulletSize: 9,
          lineColor: '#4680ff',
          lineThickness: 2,
          negativeLineColor: '#4680ff',
          type: 'smoothedLine',
          valueField: 'value'
        }
      ],
      chartCursor: {
        cursorAlpha: 0,
        valueLineEnabled: false,
        valueLineBalloonEnabled: true,
        valueLineAlpha: false,
        color: '#fff',
        cursorColor: '#FC6180',
        fullWidth: true
      },
      categoryField: 'year', // Use the year as the category axis
      categoryAxis: {
        gridAlpha: 0,
        axisAlpha: 0,
        fillAlpha: 1,
        fillColor: '#FAFAFA',
        minorGridAlpha: 0,
        minorGridEnabled: true
      },
      export: {
        enabled: true
      }
    });
  }

  // Cleanup the chart when the component is destroyed to avoid memory leaks
  ngOnDestroy() {
    if (this.chart) {
      this.chart.clear(); // Properly dispose of the chart
    }
  }

  // Fetch user count
  getUserCount() {
    this.backendService.get(`${environment.apiUrl}/admin/users/count-by-role`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        let data = response.rows;
        let nbrUser = 0;
        data.forEach(element => {
          nbrUser += element.count;
        });
        this.UserCount = nbrUser;
      })
    );
  }

  // Fetch category count
  getCategoryCount() {
    this.backendService.get(`${environment.apiUrl}/categories/count`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.CategoryCount = response.rows;
      })
    );
  }

  // Fetch product count
  getProductCount() {
    this.backendService.get(`${environment.apiUrl}/products/count`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.ProductCount = response.rows;
      })
    );
  }

  // Fetch order count
  getOrderCount() {
    this.backendService.get(`${environment.apiUrl}/orders/counts-by-status`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        let data = response.rows;
        let nbrOrder = 0;
        data.forEach(element => {
          nbrOrder += element.count;
        });
        this.OrderCount = nbrOrder;
      })
    );
  }

  // Fetch statistics for the default year
  getStatistiqueAll() {
    this.backendService
      .get(`${environment.apiUrl}/orders/statistics/${this.currentYear}`)
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          if (response.rows && response.rows.length) {
            this.datachart = response.rows;
            this.updateChartData(); 
          } else {
            console.log('No data available for the selected year');
            this.datachart = []; // Clear the chart if no data
            this.updateChartData(); 
          }
        })
      );
  }

  // Fetch statistics by selected year and status
  getStatistiqueBayYersAndStatus(selectedYear: number, selectedStatus: string) {
    this.backendService
      .get(`${environment.apiUrl}/orders/statistics/${selectedYear}?status=${selectedStatus}`)
      .subscribe(
        new Observer().OBSERVER_GET((response) => {
          if (response.rows && response.rows.length) {
            this.datachart = response.rows;
            this.updateChartData(); 
          } else {
            console.log('No data available for the selected filters');
            this.datachart = []; // Clear the chart if no data
            this.updateChartData();
          }
        })
      );
  }

  // Handle button click to load data based on selected year and status
  onButtonClick() {
    if (this.selectedYear && this.selectedStatus) {
      if (this.selectedStatus !== "-2") {
        this.getStatistiqueBayYersAndStatus(this.selectedYear, this.selectedStatus);
      } else {
        this.getStatistiqueAll();
      }
    } else {
      this.erour = true;
    }
  }

  // Update the chart with new data
  updateChartData() {
    this.chart.dataProvider = this.datachart; // Set new data for the chart
    this.chart.validateData(); // Refresh the chart to reflect new data
  }
}

// ChartJS helper functions for other charts
function buildChartJS(a, b, f, c) {
  if (f == null) {
    f = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [{
      label: '',
      borderColor: a,
      borderWidth: 2,
      hitRadius: 30,
      pointHoverRadius: 4,
      pointBorderWidth: 50,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: c,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: a,
      pointHoverBorderColor: 'rgba(0,0,0,0.5)',
      fill: true,
      backgroundColor: f,
      data: b,
    }]
  };
}

function buildChartOption() {
  return {
    title: {
      display: false
    },
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 12
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }
  };
}