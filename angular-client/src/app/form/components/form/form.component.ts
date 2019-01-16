import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  formsObs:any;

  ngOnInit() {
    this.formsObs = this.http.get('http://localhost:3001/forms').map((res) => { console.log(res); return res;});
  }

}
