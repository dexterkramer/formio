import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { empty  } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.scss']
})
export class GenerateFormComponent implements OnInit {

  constructor(private http: HttpClient, 
              private route: ActivatedRoute, 
              private _fb: FormBuilder,
              private router: Router) { }
  
  myForm: FormGroup; // our model driven form
  id = null;
  submitted = false;
  form:any =  {
    components: []
  };

  ngOnInit() {
   let pipe = this.route.params.pipe(
     tap(params => this.id = params['id']),
     switchMap(params => (params['id'] ? this.http.get('http://localhost:3001/forms/'+params['id']) : empty()))
   );

   pipe.subscribe((res) => {
     if(res){
      this.form = res['form'];
      this.myForm.setValue({formAction : res['action'], width: res['width'], name: res['name'] });
     }
   });
   this.myForm = this._fb.group({
        name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        formAction: [''],
        width: ['']
    });

  }

  save(model: FormsInfos, isValid: boolean) {
    this.submitted = true;
    if(isValid){
      if(this.id){
        this.http.put('http://localhost:3001/forms/'+this.id, { _id:this.id, form : this.form, name : model.name, width : model.width, action : model.formAction}).subscribe((res) => { 
            console.log(res); 
            if(res['data']['_id']){
              this.id = res['data']['_id'];
            } 
          });
      }else{
        this.http.post('http://localhost:3001/forms', { form : this.form, name : model.name, width : model.width, action : model.formAction} ).subscribe((res) => { 
          console.log(res); 
          if(res['data']['_id']){
            this.id = res['data']['_id'];
          } 
        });
      }
    }
  }
}

export interface FormsInfos {
  name: string; // required with minimum 5 chracters
  formAction:string;
  width:number;
}
