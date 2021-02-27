import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class DatapassService {

  constructor() { }
  child1Subject = new Subject<any>();
  child2Subject = new Subject<any>();
    
  child1DataChanges(value){
      this.child1Subject.next(value);
  }
  child2DataChanges(value){
    this.child2Subject.next(value);
}
}