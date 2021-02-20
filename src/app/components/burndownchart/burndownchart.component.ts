import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'

import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Projet } from 'src/app/models/projet';
import { Sprint } from 'src/app/models/sprint';
import { Userstory } from 'src/app/models/userStory';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { element } from 'protractor';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  
};

@Component({
  selector: 'app-burndownchart',
  templateUrl: './burndownchart.component.html',
  styleUrls: ['./burndownchart.component.css']
})
export class BurndownchartComponent implements OnInit {
  id:number;
  projet:Projet=new Projet();
   nameProjet:string;
  sprintsProjet:Sprint[]=[];
  sprintsProjetData:Sprint[]=[];
  datefinSprints:any[]=[];
  nameSprints:any[]=[];
  complexteSprints:any[]=[];
  userstorysSprints:Userstory[]=[];
  nbrSprinProjet:number=0;
  data1:any=[];
  data2:any=[];
   complexProjet:number;
  userstorysProjet:Userstory[]=[];
  @ViewChild("chart",{ static: true } ) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(public datepipe: DatePipe,private userstoryservice:UserstoryService,private sprintservice: SprintService,private projetservice:ProjetService,private route: ActivatedRoute,private router: Router) {}


  ngOnInit(): void {
    this.datefinSprints[0]=0;

    this.id=this.route.snapshot.params['id'];
    
this.userstoryservice.tableComplexite(this.id).subscribe(
  data=>{
    this.data2.push(...data)
    console.log("etrfyfjyfjfjyf"+JSON.stringify( this.data2))
  }
)
    this.projetservice.findProjetById(this.id).subscribe(
      data=>{
        this.projet=data;
        this.nameProjet=this.projet.nomProjet;
        this.sprintservice.findSprintsByProjet(this.id).subscribe(
          data=>{
            this.sprintsProjet.push(...data)
            this.sprintsProjet.shift();
            this.sprintsProjetData.push(...data)

this.sprintsProjet.forEach(element=>
  this.nameSprints.push(element.nomSprint));
  
            this.sprintsProjet.forEach(element=>
              
              this.datefinSprints.push(this.datepipe.transform(element.dateFin,'dd-MM-yy')+" "+element.nomSprint),
              
              this.userstoryservice.findAllUserstoryByProjet(this.id).subscribe(
                data=>{
                  this.complexProjet=0;
                  this.userstorysProjet.push(...data)
                  this.userstorysProjet.forEach(element=>{
                    this.complexProjet=this.complexProjet+element.complexite


                    this.initializeChartOptions(this.projet,this.complexProjet,this.nameSprints,this.datefinSprints,this.data1,this.data2);
                    console.log("datefiiiiiiiiiiiiiiiiiiiiin"+JSON.stringify(this.datefinSprints))

                  }
                  )
                  this.nbrSprinProjet=this.sprintsProjet.length;
                 for (let i = 1; i <this.nbrSprinProjet; i++) {
                    this.data1[0]=this.complexProjet;
                    this.data1[i]= Math.trunc(this.data1[i-1]-(this.complexProjet/this.nbrSprinProjet))
                    this.data1[this.nbrSprinProjet]=0;

                  }


                 


                  console.log("dataaaaa1111111111"+JSON.stringify( this.data1))
                  console.log("cccccccccccccccccccccccccccc"+JSON.stringify( this.nbrSprinProjet))
                  console.log("datefiiiiiiiiiiiiiiiiiiiiin"+JSON.stringify(this.datefinSprints))
                  console.log("ggggggggggggggggggggg"+JSON.stringify(  this.complexProjet))
                  console.log("kkkkkkkkkkkkkkkkkkkkkkk"+JSON.stringify(    this.userstorysProjet
                    ))

                })
              )
              
              

          }
        );
        



      });

       

      
          
         

    this.initializeChartOptions(this.projet,this.complexProjet,this.nameSprints,this.datefinSprints,this.data1,this.data2);
  
    console.log("datefiiiiiiiiiiiiiiiiiiiiin"+JSON.stringify(this.datefinSprints));


  }


  private initializeChartOptions(p:Projet,complexite:number,namesSprints:any[],datesFinSprints:any[],dataideal:any[],dataactual:any[]) {
    var x=complexite
    this.chartOptions = {
      series: [
        {
          name: "Ideal Tasks Remaining",
          data: dataideal
        },
       {
          name: "Actual Tasks Remaining",
          data: dataactual
        }
      ],
      chart: {
        height: 350,
        width:1200,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      
      title: {
        text: "Burndownchart: "+p.nomProjet,
        style: {
         
          color:  '#19AED5'
        },  
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        
        labels: {
          
          trim: false
        },
        categories:datesFinSprints,
        
        

      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

 
}


