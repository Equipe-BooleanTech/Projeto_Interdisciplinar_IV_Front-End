import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CollaboratorDto, CollaboratorResponseDto } from '@domain/dtos';
import { collaboratorFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { CollaboratorUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import {
    FormInputComponent,
    FormSelectComponent,
} from '@presentation/view/components/form';

import { DEFAULT_PASSWORD } from '@shared/constants';

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
    public defaultPassword = DEFAULT_PASSWORD;

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _formValidateService: FormValidateService,
        private _collaboratorUseCase: CollaboratorUseCase,
        private toastr: ToastrService,
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
            this._collaboratorUseCase
                .registerCollaborator({
                    ...this.collaboratorForm.value,
                    password: this.defaultPassword,
                    isEmployee: true,
                    isProspecting: false,
                } as CollaboratorDto)
                .subscribe({
                    next: (response: CollaboratorResponseDto) => {
                        this.toastr.success(
                            'Colaborador cadastrado com sucesso!',
                            
                        );
                        setTimeout(() => {
                            this._router.navigate(['/admin/colaboradores']);
                        }, 3000)
                    },
                    error: () =>
                        this.toastr.error('Erro ao cadastrar colaborador.'),
                });
        } else {
            this.toastr.error('Formulário Inválido.');
        }
    }
}
