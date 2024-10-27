import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { RegisterColaborattorDto } from '@domain/dtos';
import { collaboratorFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { RegisterColaborattorUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import {
    FormInputComponent,
    FormSelectComponent,
} from '@presentation/view/components/form';

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
        FormSelectComponent,
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
        private _router: Router,
        private _formValidateService: FormValidateService,
        private _registerColaborattorUseCase: RegisterColaborattorUseCase,
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
            this._registerColaborattorUseCase
                .registerColaborattor(
                    this.collaboratorForm.value as RegisterColaborattorDto,
                )
                .subscribe((response) => {
                    alert('Colaborador cadastrado com sucesso!');
                    this._router.navigate(['/admin/colaboradores']);
                });
        } else {
            console.log('Formulário inválido');
        }
    }
}
