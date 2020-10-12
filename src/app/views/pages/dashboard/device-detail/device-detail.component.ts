import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexGrid, ApexChart,
  ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend, ApexResponsive, ApexTooltip,
  ApexFill, ApexDataLabels, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { DevicesService } from 'src/app/services/devices/devices.service';
export type apexChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle
};

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})


export class DeviceDetailComponent implements OnInit {
  type = 'caudal';
  public apexChart4Options: Partial<apexChartOptions>;

  public ng2BarChart1Options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#8392a5',
          fontSize: 10
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(77, 138, 240, .1)'
        },
        ticks: {
          fontColor: '#8392a5',
          fontSize: 10,
          min: 80,
          max: 200
        }
      }]
    }
  };
  public ng2BarChart1Labels: Label[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  public ng2BarChart1Type: ChartType = 'bar';
  public ng2BarChart1Colors: Color[] = [ { backgroundColor: "#727cf5" } ]
  public ng2BarChart1Legend = false;
  public ng2BarChart1Data: ChartDataSets[] = [
    { data: [150,110,90,115,125,160,190,140,100,110,120,120], label: 'Sales', categoryPercentage: .6, barPercentage: .3 }
  ];


  constructor(private service: DevicesService) {
    this.apexChart4Options = {
      chart: {
        type: "line",
        height: 350,
        sparkline: {
          // enabled: !0
        },
        toolbar: {
          show: false
        }
      },
      series: [
        {
          data: []
        }
    ],
      stroke: {
        width: 2,
        curve: "straight"
      },
      markers: {
        size: 0
      },
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",
        padding: {
          bottom: -10
        }
      },
      xaxis: {
        categories: ["Jan","","","","","","","","","","","","","","","","Feb","","","","","","","","","","","","","","","","Mar","","","","","","","","","","","","","","","","Apr","","","","","","","","","","","","","","","","May","","","","","","","","","","","","","","","","Jun","","","","","","","","","","","","","","","","Jul","","","","","","","","","","","","","","","","Aug","","","","","","","","","","","","","","","","Sep","","","","","","","","","","","","","","","","Oct","","","","",""],
        labels: {
          style: {
            colors: '#686868',
            fontSize: '13px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '[#686868, #ff3366]',
            fontSize: '11px',
            fontFamily: 'Overpass, sans-serif',
            fontWeight: 400,
          }
        },
      },
      colors: ["#727cf5", '#ff3366'],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };
   }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const query = {
      serie: "12345678",
  }

    this.service.getDeviceDetail(query).toPromise().then((rsp: any) => {
      console.log(rsp);
      rsp.forEach(element => {
        console.log(element.data.sensores);

      });
      // let series = rsp.data.sensores.map((dataValues => {

      //   const obj =  {
      //     data: [dataValues.valor]
      //   }

      //   return obj
      // }))

      // console.log(series);
      

    }, err => {
      console.log(err);
    });
  }

}
