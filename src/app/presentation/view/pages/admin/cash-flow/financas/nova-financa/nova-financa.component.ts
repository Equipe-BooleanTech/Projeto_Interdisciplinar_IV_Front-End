import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { financeFields } from '@domain/static/data/forms/finance/finance';
import { FormValidateService } from '@domain/static/services';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';
import { FormInputComponent } from "../../../../../components/form/form-input/form-input.component";

@Component({
  selector: 'app-nova-financa',
  standalone: true,
  imports: [SidebarComponent, FormComponent, ButtonComponent, FormInputComponent, CommonModule,
    ReactiveFormsModule],
  templateUrl: './nova-financa.component.html',
  styles: ``
})
export class NovaFinancaComponent implements OnInit {
  financeForm: FormGroup = new FormGroup({});
  financeFormFields = financeFields;

  constructor(
      private _fb: FormBuilder,
      private _formValidateService: FormValidateService,
  ) {}
  ngOnInit(): void {
      this._initForm();
  }

  private _initForm(): void {
      this.financeForm = this._fb.group(
          this.financeFormFields.fields.reduce(
              (formFields, field) => {
                  formFields[field.name] = [
                      field.value || '',
                      this._formValidateService.bindValidations(
                          field.validations || [],
                      ),
                  ];
                  return formFields;
              },
              {} as { [key: string]: [string, ValidatorFn | null] },
          ),
      );
  }

  onSubmit(): void {
      if (this.financeForm.valid) {
          console.log(this.financeForm.value);
      } else {
          console.log('Formulário inválido');
      }
  }
 
}
