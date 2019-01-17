import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  formsObs:any = new BehaviorSubject(null);

  delete(id:number){
    this.http.delete('http://localhost:3001/forms/'+id).subscribe((res) => {
      this.formsObs = this.http.get('http://localhost:3001/forms');
    });
    
  }

  ngOnInit() {
    this.formsObs = this.http.get('http://localhost:3001/forms');
  }

}
