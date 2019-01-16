import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval, fromEvent, merge, empty  } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.scss']
})
export class DisplayFormComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    let pipe = this.route.params.pipe(
      tap(params => this.id = params['id']),
      switchMap(params => (params['id'] ? this.http.get('http://localhost:3001/forms/'+params['id']) : empty()))
    );
 
    pipe.subscribe((res) => {
      if(res){
       this.form = res['form'];
       this.formAction = res['action'];
       this.width = res['width'];
      }
    });
   }


   width:number = null;
   id = null;
   formAction:string = "";
   form:any =  {
     components: []
   };

   onSubmit(submission: any) {
    return fetch(this.formAction, {
          body: JSON.stringify(submission),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        });
   }
}
