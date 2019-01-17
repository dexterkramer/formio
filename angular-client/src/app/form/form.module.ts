import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioGrid } from 'angular-formio/grid';
import { FormComponent } from './components/form/form.component';
import { FormioModule } from 'angular-formio';
import { GenerateFormComponent } from './components/generate-form/generate-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DisplayFormComponent } from './components/display-form/display-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormioGrid,
    FormioModule,
    RouterModule.forChild([{
      path: '',
      component: FormComponent
    }, {
      path : 'generate',
      component : GenerateFormComponent
    },{
      path : 'generate/:id',
      component : GenerateFormComponent
    },{
      path : 'display/:id',
      component : DisplayFormComponent
    }
    ])
  ],
  declarations: [
    FormComponent, 
    GenerateFormComponent, DisplayFormComponent
  ],
  providers: [

  ]
})
export class FormModule { }
