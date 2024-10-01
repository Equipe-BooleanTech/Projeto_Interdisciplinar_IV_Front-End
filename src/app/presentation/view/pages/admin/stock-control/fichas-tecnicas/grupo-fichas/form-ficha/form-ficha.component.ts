/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { FormValidateService } from '@infra/services';
import { FormComponent, SidebarComponent } from '@presentation/view/components';
import { FormInputComponent } from "../../../../../../components/form/form-input/form-input.component";

@Component({
  selector: 'app-form-ficha',
  standalone: true,
  imports: [SidebarComponent, FormComponent, ReactiveFormsModule, CommonModule, FormInputComponent],
  templateUrl: './form-ficha.component.html',
  styles: ``
})
export class FormFichaComponent implements OnInit {

  form: FormGroup = new FormGroup({});

    constructor(
    private _formBuilder: FormBuilder,
    private _formValidateService: FormValidateService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group(
      this.config.fields.reduce((formFields: { [key: string]: any[] }, field) => {
        formFields[field.name] = [
          field.value || '',
          this._formValidateService.bindValidations(
            field.validations?.map(validation => ({
              ...validation,
              value: validation.name || '' // Garantir que 'value' esteja presente
            })) || []
          )
        ];
        return formFields;
      }, {} as { [key: string]: [string, ValidatorFn | null] })
    );
  }

  config= {
    fields:[
      {
        component: 'input',
        name: 'nome',
        type: 'text',
        label: 'Nome do Item:*',
        value:'',
        placeholder:'Digite aqui o nome do item...',
        validations: [{name: 'required', message: 'Campo obrigatório'}]
      },
      {
        component: 'select',
        options: [
          {value: '1', label: 'Entrada'},
          {value: '2', label: 'Prato Principal'},
          {value: '3', label: 'Sobremesa'},
          {value: '4', label: 'Bebida'},
          {value: '5', label: 'Outros'},
        ],
        name: 'ingredientes',
        type: 'text',
        label: 'Ingredientes:*',
        value:'',
        placeholder:'Selecione os ingredientes...',
        validations: [{name: 'required', message: 'Campo obrigatório'}]
      },
      {
        component: 'input',
        name: 'tempo',
        type: 'text',
        label: 'Tempo de Preparo:',
        value:'',
        placeholder:'Digite aqui o tempo de preparo...',
      },
      {
        component: 'input',
        name: 'custo',
        type: 'text',
        label: 'Custo final:*',
        value:'',
        placeholder:'Digite aqui o custo final...',
        validations: [{name: 'required', message: 'Campo obrigatório'}]
      },
      {
        component: 'input',
        name: 'rendimentoPorcao',
        type: 'text',
        label: 'Redimento porção:',
        value:'',
        placeholder:'Digite aqui o rendimento por porção...',
      },
      {
        component: 'input',
        name: 'rendimentoTotal',
        type: 'text',
        label: 'Redimento total:',
        value:'',
        placeholder:'Digite aqui o rendimento total em porções...',
      },      
    ]
  }

}
