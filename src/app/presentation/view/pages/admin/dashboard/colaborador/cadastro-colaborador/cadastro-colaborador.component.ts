import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { collaboratorFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

@Component({
    selector: 'app-cadastro-colaborador',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
        FormComponent,
    ],
    templateUrl: './cadastro-colaborador.component.html',
    styles: ``,
})
export class CadastroColaboradorComponent implements OnInit {
    collaboratorForm: FormGroup = new FormGroup({});
    collaboratorFormFields = collaboratorFields;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.collaboratorForm = this._fb.group(
            this.collaboratorFormFields.fields.reduce(
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
        if (this.collaboratorForm.valid) {
            console.log(this.collaboratorForm.value);
        } else {
            console.log('Formulário inválido');
        }
    }
}
