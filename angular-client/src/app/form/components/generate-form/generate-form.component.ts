import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { empty  } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.scss']
})
export class GenerateFormComponent implements OnInit {

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
      this.name = res['name'];
     }
   });
  }

  id = null;
  name = null;
  formAction:string = "";
  width:number = null;
  form:any =  {
    components: []
  };

  save(){

    if(this.id){
      this.http.put('http://localhost:3001/forms/'+this.id, { form : this.form, name : this.name, width : this.width, action : this.formAction}).subscribe((res) => { console.log(res); });
    }else{
      this.http.post('http://localhost:3001/forms', { form : this.form, name : this.name, width : this.width, action : this.formAction} ).subscribe((res) => { console.log(res); });
    }

  }



}
