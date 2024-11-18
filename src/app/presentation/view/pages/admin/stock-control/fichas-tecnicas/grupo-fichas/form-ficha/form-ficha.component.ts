import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import {
    IngredientDto,
    PaginatedResponse,
    DefaultResponseDto,
    DataSheetDto,
    SupplierDto,
} from '@domain/dtos';
import { fichaFormFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { IngredientsUseCase, DataSheetUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
        private ingredientUseCase: IngredientsUseCase,
        private datasheetUseCase: DataSheetUseCase,
        private toastr: ToastrService,
        private _router: Router,
        private route: ActivatedRoute,
    ) {}

    protected retrieveHttpMethod() {
        return this._router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields(): void {
        if (this.retrieveHttpMethod() === 'PUT') {
            this.datasheetUseCase
                .getDataSheetById(this.route.snapshot.params['id'])
                .subscribe((datasheet) => {
                    this.fichaFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                datasheet,
                                fieldName,
                            )
                        ) {
                            field.value = datasheet[
                                fieldName as keyof DataSheetDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
    }

    private _updateFormValues(): void {
        const updatedValues = this.fichaFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value || '';
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.fichaForm.patchValue(updatedValues);
    }
    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir a ficha técnica? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return; // Interrompe a execução se o usuário cancelar
        }

        this.datasheetUseCase
            .deleteDataSheet(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Ficha técnica excluída com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this._router.navigate([
                            '/admin/estoque/fichas-tecnicas',
                        ]);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir a ficha técnica. Verifique se há algum grupo de fichas associado e tente novamente.',
                        'Oops...',
                    );
                },
            });
    }

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

        this.loadIngredients();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }

    private loadIngredients(): void {
        this.ingredientUseCase
            .getIngredients(0, 100)
            .pipe(
                map((response: PaginatedResponse<IngredientDto>) =>
                    response.content.map((ingredient) => ({
                        value: ingredient.name,
                        label: ingredient.name + ' ' + ingredient.description,
                    })),
                ),
            )
            .subscribe((ingredientOptions) => {
                const ingredientField = this.fichaFields.fields.find(
                    (field) => field.name === 'ingredients',
                );
                if (ingredientField) {
                    ingredientField.options = ingredientOptions;
                }
            });
    }

    submit(): void {
        const formattedResponse = {
            ...this.fichaForm.value,
            ingredients: this.fichaForm.value.ingredients.map(
                (name: string) => ({
                    name: name,
                }),
            ),
        };
        if (this.retrieveHttpMethod() === 'POST') {
            this.datasheetUseCase
                .registerDataSheet(formattedResponse)
                .subscribe({
                    next: (response: DataSheetDto) => {
                        this.toastr.success(
                            'Ficha técnica cadastrada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                '/admin/estoque/fichas-tecnicas',
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao cadastrar ficha técnica'),
                });
        } else {
            this.datasheetUseCase
                .updateDataSheet(
                    this.route.snapshot.params['id'],
                    formattedResponse,
                )
                .subscribe({
                    next: (response: DataSheetDto) => {
                        this.toastr.success(
                            'Ficha técnica atualizada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                '/admin/estoque/fichas-tecnicas',
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao atualizar ficha técnica'),
                });
        }
    }
}
