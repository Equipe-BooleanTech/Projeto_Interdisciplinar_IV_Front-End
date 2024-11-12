import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
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
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._loadSuppliers();
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

    private _loadSuppliers(): void {
        this._supplierUseCase
            .getSuppliers(0, 100)
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
                    this.toastr.error('Ingrediente já cadastrado, edite-o ou crie um novo ingrediente com outro nome', "Oops...");
                    return true;
                }
                return false;
            }),
            catchError((error) => {
                console.error('Error checking ingredient existence', error);
                return of(false);
            })
        );
    }

    onSubmit(): void {
        if (this.ingredientForm.valid) {
            this.checkIfIngredientExists().pipe(
                switchMap((ingredientExists) => {
                    if (!ingredientExists) {
                        const formattedRequest = {
                            ...this.ingredientForm.value,
                            supplier: this.ingredientForm.value.supplier.map((name: string) => ({
                                name: name,
                            })),
                        };

                        return this._ingredientUseCase.registerIngredient(formattedRequest as IngredientDto);
                    } else {
                        return of(null);
                    }
                })
            ).subscribe((response) => {
                if (response) {
                    this.toastr.success('Ingrediente cadastrado com sucesso!', "Sucesso");
                    this._router.navigate(['/admin/estoque/ingredientes']);
                }
            });
        }
    }
}