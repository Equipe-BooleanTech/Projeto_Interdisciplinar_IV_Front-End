import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { FormValidateService } from '@domain/static/services';
import { revenueFields } from '@domain/static/data/forms/revenue/revenue';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { CommonModule, NgIf, NgSwitch } from '@angular/common';
import { FormInputComponent } from '@presentation/view/components/form';
import { CollaboratorUseCase, RevenuesUseCase } from '@domain/usecases';
import {
    CollaboratorDto,
    DefaultResponseDto,
    PaginatedResponse,
} from '@domain/dtos';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-nova-receita',
    standalone: true,
    imports: [
        ButtonComponent,
        SidebarComponent,
        FormComponent,
        NgSwitch,
        FormInputComponent,
        ReactiveFormsModule,
        NgIf,
        CommonModule,
    ],
    templateUrl: './nova-receita.component.html',
    styles: ``,
})
export class NovaReceitaComponent implements OnInit {
    revenueForm: FormGroup = new FormGroup({});
    revenueFormFields = revenueFields;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _revenueUseCase: RevenuesUseCase,
        private _collaboratorUseCase: CollaboratorUseCase,
        private toastr: ToastrService,
    ) {}
    ngOnInit(): void {
        this._initForm();
        this._mapFieldsFromAPIResponse();
    }

    private _sendForm(): void {
        this._revenueUseCase.createRevenue(this.revenueForm.value).subscribe({
            next: (response) => {
                this.toastr.success(
                    'Receita cadastrada com sucesso!',
                    'Sucesso',
                );
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            },
            error: (error: DefaultResponseDto) => {
                this.toastr.error(
                    'Ocorreu um erro ao cadastrar a receita. Tente novamente!',
                    'Oops..',
                );
            },
        });
    }
    private _mapFieldsFromAPIResponse(): void {
        this._collaboratorUseCase
            .getAllCollaborators(0, 999)
            .subscribe((response: PaginatedResponse<CollaboratorDto>) => {
                const collaboratorField = this.revenueFormFields.fields.find(
                    (field) => field.name === 'employee',
                );

                if (collaboratorField) {
                    collaboratorField.options = response.content
                        .filter((collaborator) => collaborator.fullName) // Filtra apenas os colaboradores com fullName existente
                        .map((collaborator) => ({
                            value: collaborator.fullName,
                            label: collaborator.fullName,
                        }));
                }
            });
    }

    private _initForm(): void {
        this.revenueForm = this._fb.group(
            this.revenueFormFields.fields.reduce(
                (revenueFields, field) => {
                    revenueFields[field.name] = [
                        field.value || '',
                        this._formValidateService.bindValidations(
                            field.validations || [],
                        ),
                    ];
                    return revenueFields;
                },
                {} as { [key: string]: [string, ValidatorFn | null] },
            ),
        );
    }

    onSubmit(): void {
        if (this.revenueForm.valid) {
            console.log(this.revenueForm.value);
            this._sendForm();
        } else {
            console.log('Formulário inválido');
        }
    }
}
