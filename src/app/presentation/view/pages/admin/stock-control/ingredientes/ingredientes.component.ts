import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { ingredientFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

@Component({
    selector: 'app-ingredientes',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        FormInputComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './ingredientes.component.html',
    styles: ``,
})
export class IngredientesComponent implements OnInit {
    ingredientForm: FormGroup = new FormGroup({});
    ingredientFormFields = ingredientFields;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
    ) {}
    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.ingredientForm = this._fb.group(
            this.ingredientFormFields.fields.reduce(
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
        if (this.ingredientForm.valid) {
            console.log(this.ingredientForm.value);
        } else {
            console.log('Formulário inválido');
        }
    }
}
