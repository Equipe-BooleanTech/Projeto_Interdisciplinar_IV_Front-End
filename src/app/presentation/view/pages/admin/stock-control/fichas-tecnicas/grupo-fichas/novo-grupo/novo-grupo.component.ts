import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { groupFormFields } from '@domain/static/data/forms/group/group';
import { FormValidateService } from '@domain/static/services';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

@Component({
  selector: 'app-novo-grupo',
  standalone: true,
  imports: [
    SidebarComponent,
    FormComponent,
    ReactiveFormsModule,
    CommonModule,
    FormInputComponent, ButtonComponent],
  templateUrl: './novo-grupo.component.html',
  styles: ``
})
export class NovoGrupoComponent {

    groupForm: FormGroup = new FormGroup({});
    groupFields = groupFormFields;
    method: 'POST' | 'PUT' = 'POST';
    constructor(
        private _formBuilder: FormBuilder,
        private _formValidateService: FormValidateService,
    ) {}

    ngOnInit(): void {
        this.groupForm = this._formBuilder.group(
            this.groupFields.fields.reduce(
                (formFields: { [key: string]: any[] }, field) => {
                    formFields[field.name] = [
                        field.value || '',
                        this._formValidateService.bindValidations(
                            field.validations?.map((validation) => ({
                                ...validation,
                                value: validation.name || '',
                            })) || [],
                        ),
                    ];
                    return formFields;
                },
                {} as { [key: string]: [string, ValidatorFn | null] },
            ),
        );
    }

    submit(): void {
        if (this.groupForm.valid) {
            console.log(this.groupForm.value);
        } else {
            console.log('Form is invalid');
        }
    }

    goBack(): void {
        console.log('Go back');
    }

}
