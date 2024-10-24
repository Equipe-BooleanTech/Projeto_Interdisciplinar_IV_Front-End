import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { fichaFormFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

@Component({
    selector: 'app-form-ficha',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
        ButtonComponent,
    ],
    templateUrl: './form-ficha.component.html',
    styles: ``,
})
export class FormFichaComponent implements OnInit {
    fichaForm: FormGroup = new FormGroup({});
    fichaFields = fichaFormFields;
    method: 'POST' | 'PUT' = 'POST';
    constructor(
        private _formBuilder: FormBuilder,
        private _formValidateService: FormValidateService,
    ) {}

    ngOnInit(): void {
        this.fichaForm = this._formBuilder.group(
            this.fichaFields.fields.reduce(
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
        if (this.fichaForm.valid) {
            console.log(this.fichaForm.value);
        } else {
            console.log('Form is invalid');
        }
    }

    goBack(): void {
        console.log('Go back');
    }

    // merge
}
