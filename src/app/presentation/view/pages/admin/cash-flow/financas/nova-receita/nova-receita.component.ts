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
import { CollaboratorDto, PaginatedResponse, RevenueDto } from '@domain/dtos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
    ) {}
    ngOnInit(): void {
        this._initForm();
        this._mapFieldsFromAPIResponse();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }
    onSubmit(): void {
        if (this.retrieveHttpMethod() === 'POST') {
            this._revenueUseCase
                .createRevenue({
                    ...this.revenueForm.value,
                } as RevenueDto)
                .subscribe({
                    next: (response: RevenueDto) => {
                        this.toastr.success(
                            'Receita cadastrada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this.router.navigate([
                                '/admin/controle-caixa/financas',
                            ]);
                        }, 3000);
                    },
                    error: () => this.toastr.error('Erro ao cadastrar receita'),
                });
        } else {
            this._revenueUseCase
                .updateRevenue(
                    this.route.snapshot.params['id'],
                    this.revenueForm.value,
                )
                .subscribe({
                    next: (response: RevenueDto) => {
                        this.toastr.success(
                            'Despesa atualizada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this.router.navigate([
                                '/admin/controle-caixa/financas',
                            ]);
                        }, 3000);
                    },
                    error: () => this.toastr.error('Erro ao atualizar despesa'),
                });
        }
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

    protected retrieveHttpMethod() {
        return this.router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._revenueUseCase
                .getRevenueById(this.route.snapshot.params['id'])
                .subscribe((revenue) => {
                    this.revenueFormFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                revenue,
                                fieldName,
                            )
                        ) {
                            field.value = revenue[
                                fieldName as keyof RevenueDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
    }

    private _updateFormValues() {
        const updatedValues = this.revenueFormFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value;
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.revenueForm.patchValue(updatedValues);
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir a receita? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return;
        }

        this._revenueUseCase
            .deleteRevenue(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Receita excluída com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this.router.navigate([
                            '/admin/controle-caixa/financas',
                        ]);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir a despesa. Tente novamente.',
                        'Oops...',
                    );
                },
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
}
