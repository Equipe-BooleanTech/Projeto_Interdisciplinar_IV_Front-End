import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateService } from '@domain/static/services';
import { DataSheetGroupUseCase, DataSheetUseCase } from '@domain/usecases';
import { ToastrService } from 'ngx-toastr';
import {
    SidebarComponent,
    FormComponent,
    ButtonComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { groupFormFields } from '@domain/static/data/forms/group/group';
import { DataSheetGroupDto } from '@domain/dtos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-novo-grupo',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
        ButtonComponent,
    ],
    templateUrl: './novo-grupo.component.html',
    styles: ``,
})
export class NovoGrupoComponent implements OnInit {
    fichaGroupForm: FormGroup = new FormGroup({});
    groupFields = groupFormFields;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _dataSheetGroupUseCase: DataSheetGroupUseCase,
        private _dataSheetUseCase: DataSheetUseCase,
        private toastr: ToastrService,
        private _router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._loadDataSheets();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }

    private _loadDataSheets(): void {
        this._dataSheetUseCase.getDatasheets(0, 100).subscribe((response) => {
            const dataSheetOptions = response.content.map((datasheet) => ({
                value: datasheet.name,
                label: datasheet.name,
            }));
            const dataSheetField = this.groupFields.fields.find(
                (field) => field.name === 'datasheets',
            );
            if (dataSheetField) {
                dataSheetField.options = dataSheetOptions;
            }
        });
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir o grupo de fichas? Note que essa ação não apagará as fichas técnicas.',
        );

        if (!confirmation) {
            return;
        }

        this._dataSheetGroupUseCase
            .deleteDataSheetGroup(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Grupo de fichas excluído com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this._router.navigate([
                            '/admin/estoque/fichas-tecnicas',
                        ]);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir o grupo de ficha. Verifique se há alguma ficha técnica associado e tente novamente.',
                        'Oops...',
                    );
                },
            });
    }

    protected retrieveHttpMethod() {
        return this._router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._dataSheetGroupUseCase
                .getGroupById(this.route.snapshot.params['id'])
                .subscribe((group) => {
                    this.groupFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                group,
                                fieldName,
                            )
                        ) {
                            field.value = group[
                                fieldName as keyof DataSheetGroupDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
    }

    private _initForm(): void {
        this.fichaGroupForm = this._fb.group(
            this.groupFields.fields.reduce(
                (formFields, field) => {
                    const fieldValue =
                        field.value ?? (Array.isArray(field.value) ? [] : '');

                    // Ensure validations are handled gracefully
                    const validations = field.validations
                        ? this._formValidateService.bindValidations(
                              field.validations,
                          )
                        : null;

                    formFields[field.name] = [fieldValue, validations];

                    return formFields;
                },
                {} as {
                    [key: string]: [string | string[], ValidatorFn | null];
                },
            ),
        );
    }

    private _updateFormValues(): void {
        const updatedValues = this.groupFields.fields.reduce(
            (acc, field) => {
                if (field.name === 'datasheets' && Array.isArray(field.value)) {
                    acc[field.name] = field.value;
                } else {
                    acc[field.name] =
                        field.value ?? (Array.isArray(field.value) ? [] : '');
                }
                return acc;
            },
            {} as { [key: string]: string | string[] },
        );

        this.fichaGroupForm.patchValue(updatedValues);
    }

    onSubmit(): void {
        const formattedResponse = {
            ...this.fichaGroupForm.value,
            datasheets: this.fichaGroupForm.value.datasheets.map(
                (name: string) => ({
                    name: name,
                }),
            ),
        };
        if (this.retrieveHttpMethod() === 'POST') {
            this._dataSheetGroupUseCase
                .registerDataSheetGroup(formattedResponse)
                .subscribe({
                    next: (response: DataSheetGroupDto) => {
                        this.toastr.success(
                            'Grupo de fichas cadastrado com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                `/admin/estoque/fichas-tecnicas`,
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao cadastrar fornecedor'),
                });
        } else {
            this._dataSheetGroupUseCase
                .updateGroupSheet(
                    this.route.snapshot.params['id'],
                    formattedResponse,
                )
                .subscribe({
                    next: (response: DataSheetGroupDto) => {
                        this.toastr.success(
                            'Grupo de fichas atualizado com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                '/admin/estoque/fichas-tecnicas',
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao atualizar grupo de fichas'),
                });
        }
    }
}
