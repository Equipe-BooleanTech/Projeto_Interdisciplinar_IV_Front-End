import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientDto, PaginatedResponse, SupplierDto } from '@domain/dtos';
import { ingredientFields } from '@domain/static/data/forms/ingredient/ingredient';
import { FormValidateService } from '@domain/static/services';
import { IngredientsUseCase, SuppliersUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
        private _router: Router,
        private _ingredientUseCase: IngredientsUseCase,
        private _supplierUseCase: SuppliersUseCase,
        private route: ActivatedRoute,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._loadSuppliers();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir o ingrediente? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return; // Interrompe a execução se o usuário cancelar
        }

        this._ingredientUseCase
            .deleteIngredient(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Ingrediente excluído com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this._router.navigate(['/admin/estoque/ingredientes']);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir o ingrediente. Verifique se há alguma ficha técnica associada e tente novamente.',
                        'Oops...',
                    );
                },
            });
    }

    protected retrieveHttpMethod() {
        return this._router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields(): void {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._ingredientUseCase
                .getIngredientById(this.route.snapshot.params['id'])
                .subscribe((ingredient) => {
                    this.ingredientFormFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                ingredient,
                                fieldName,
                            )
                        ) {
                            field.value = ingredient[
                                fieldName as keyof IngredientDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
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

    private _updateFormValues(): void {
        const updatedValues = this.ingredientFormFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value || '';
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.ingredientForm.patchValue(updatedValues);
    }

    private _loadSuppliers(): void {
        this._supplierUseCase
            .getSuppliers(0, 9999)
            .pipe(
                map((response: PaginatedResponse<SupplierDto>) =>
                    response.content.map((supplier) => ({
                        value: supplier.name || '',
                        label: supplier.name,
                    })),
                ),
            )
            .subscribe((supplierOptions) => {
                const supplierField = this.ingredientFormFields.fields.find(
                    (field) => field.name === 'supplier',
                );
                if (supplierField) {
                    supplierField.options = supplierOptions;
                }
            });
    }

    private checkIfIngredientExists(): Observable<boolean> {
        return this._ingredientUseCase.getIngredients(0, 100).pipe(
            map((response: PaginatedResponse<IngredientDto>) => {
                const ingredient = response.content.find(
                    (ingredient) =>
                        ingredient.name === this.ingredientForm.value.name,
                );
                if (ingredient) {
                    this.toastr.error(
                        'Ingrediente já cadastrado, edite-o ou crie um novo ingrediente com outro nome',
                        'Oops...',
                    );
                    return true;
                }
                return false;
            }),
            catchError((error) => {
                console.error(
                    'Erro ao verificar a existência do ingrediente',
                    error,
                );
                return of(false);
            }),
        );
    }

    onSubmit(): void {
        if (this.retrieveHttpMethod() === 'POST') {
            this.checkIfIngredientExists()
                .pipe(
                    switchMap((ingredientExists) => {
                        if (!ingredientExists) {
                            const formattedRequest = {
                                ...this.ingredientForm.value,
                                supplier: Array.isArray(
                                    this.ingredientForm.value.supplier,
                                )
                                    ? this.ingredientForm.value.supplier.map(
                                          (name: string) => ({ name }),
                                      )
                                    : [],
                            };

                            return this._ingredientUseCase.registerIngredient(
                                formattedRequest as IngredientDto,
                            );
                        } else {
                            return of(null);
                        }
                    }),
                )
                .subscribe((response) => {
                    if (response) {
                        this.toastr.success(
                            'Ingrediente cadastrado com sucesso!',
                            'Sucesso',
                        );
                        this._router.navigate(['/admin/estoque/ingredientes']);
                    }
                });
        } else {
            const currentIngredientId = this.route.snapshot.params['id'];

            this.checkIfIngredientExists()
                .pipe(
                    switchMap((ingredientExists) => {
                        if (
                            ingredientExists &&
                            this.ingredientForm.value.name !==
                                this.ingredientFormFields.fields.find(
                                    (field) => field.name === 'name',
                                )?.value
                        ) {
                            return of(null);
                        }

                        const formattedRequest = {
                            ...this.ingredientForm.value,
                            supplier: Array.isArray(
                                this.ingredientForm.value.supplier,
                            )
                                ? this.ingredientForm.value.supplier.map(
                                      (name: string) => ({ name }),
                                  )
                                : [],
                        };
                        return this._ingredientUseCase.updateIngredient(
                            currentIngredientId,
                            formattedRequest,
                        );
                    }),
                )
                .subscribe({
                    next: (response) => {
                        if (response) {
                            this.toastr.success(
                                'Ingrediente atualizado com sucesso! Redirecionando...',
                            );
                            setTimeout(() => {
                                this._router.navigate([
                                    '/admin/estoque/ingredientes',
                                ]);
                            }, 3000);
                        }
                    },
                    error: () =>
                        this.toastr.error(
                            'Erro ao atualizar ingrediente. Verifique os dados informados e tente novamente!',
                        ),
                });
        }
    }
}
