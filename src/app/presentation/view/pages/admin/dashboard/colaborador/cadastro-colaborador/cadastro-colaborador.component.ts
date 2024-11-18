import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorDto } from '@domain/dtos';
import { collaboratorFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { CollaboratorUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { ToastrService } from 'ngx-toastr';

import { DEFAULT_PASSWORD } from '@shared/constants';
import { TokenService } from '../../../../../../../security';

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
    public defaultPassword = DEFAULT_PASSWORD;

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _formValidateService: FormValidateService,
        private _collaboratorUseCase: CollaboratorUseCase,
        private toastr: ToastrService,
        private _route: ActivatedRoute,
        private authService: TokenService,
    ) {}

    ngOnInit(): void {
        this._initForm();
        if (this._retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
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

    protected _retrieveHttpMethod(): string {
        const containsID = this._route.snapshot.params['id'];
        return containsID ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this._retrieveHttpMethod() === 'PUT') {
            this._collaboratorUseCase
                .getCollaboratorById(this._route.snapshot.params['id'])
                .subscribe((collaborator) => {
                    this.collaboratorFormFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                collaborator,
                                fieldName,
                            )
                        ) {
                            field.value = collaborator[
                                fieldName as keyof CollaboratorDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
    }

    private _updateFormValues() {
        const updatedValues = this.collaboratorFormFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value;
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.collaboratorForm.patchValue(updatedValues);
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir o colaborador? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return; // Interrompe a execução se o usuário cancelar
        }

        const sessionId = this.authService.getUserId();

        // Valida se o ID a ser excluído é o mesmo do usuário logado
        if (this._route.snapshot.params['id'] === sessionId) {
            this.toastr.warning(
                'Você não pode excluir o colaborador que está atualmente logado!',
            );
            return;
        }

        this._collaboratorUseCase
            .deleteCollaborator(this._route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Colaborador excluído com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this._router.navigate(['/admin/colaboradores']);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir o colaborador. Verifique se há algum ingrediente associado e tente novamente.',
                        'Oops...',
                    );
                },
            });
    }

    onSubmit(): void {
        if (this._retrieveHttpMethod() === 'POST') {
            this._collaboratorUseCase
                .registerCollaborator({
                    ...this.collaboratorForm.value,
                    isProspecting: false,
                    isEmployee: true,
                } as CollaboratorDto)
                .subscribe({
                    next: (response: CollaboratorDto) => {
                        this.toastr.success(
                            'Colaborador cadastrado com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate(['/admin/colaboradores']);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao cadastrar colaborador'),
                });
        } else {
            this._collaboratorUseCase
                .updateCollaborator(this._route.snapshot.params['id'], {
                    ...this.collaboratorForm.value,
                    isProspecting: false,
                    isEmployee: true,
                } as CollaboratorDto)
                .subscribe({
                    next: (response: CollaboratorDto) => {
                        this.toastr.success(
                            'Colaborador atualizado com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate(['/admin/colaboradores']);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao atualizar colaborador!'),
                });
        }
    }
}
