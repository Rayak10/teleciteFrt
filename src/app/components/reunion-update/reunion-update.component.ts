import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reunion } from 'src/app/models/Reunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';

@Component({
  selector: 'app-reunion-update',
  templateUrl: './reunion-update.component.html',
  styleUrls: ['./reunion-update.component.css']
})
export class ReunionUpdateComponent implements OnInit {
  reunion:Reunion;
  id:number;
  constructor(private reunionservice:ReunionService,private route: ActivatedRoute, private router: Router,private userstoryservice:UserstoryService) { }

  ngOnInit() {
    this.reunion=new Reunion();
    
    this.id=this.route.snapshot.params['id'];
    this.reunionservice.findReunionById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.reunion=data;
    }, error=>console.log(error));
    




    

  }



  updateReunion(){
    this.reunionservice.updateRieunion(this.id , this.reunion )
    .subscribe(data=> console.log(data),error=>console.log(error)),
    
      this.reunion=new Reunion();
    
     // this.gotoList();
     // this.reloadData();
  }
  onSubmit(){









  
}
}