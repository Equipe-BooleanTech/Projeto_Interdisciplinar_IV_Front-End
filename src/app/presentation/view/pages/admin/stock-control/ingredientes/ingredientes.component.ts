import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PaginatedResponse, SupplierDto, IngredientDto } from '@domain/dtos';
import { ingredientFields } from '@domain/static/data/forms/ingredient/ingredient';
import { FormValidateService } from '@domain/static/services';
import { IngredientsUseCase, SuppliersUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { map } from 'rxjs/operators';

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
            .getSuppliers()
            .pipe(
                map((response: PaginatedResponse<SupplierDto>) =>
                    response.content.map((supplier) => ({
                        value: JSON.stringify(
                            JSON.parse(JSON.stringify(supplier)),
                        ),
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

    onSubmit(): void {
        if (this.ingredientForm.valid) {
            console.log(this.ingredientForm.value);
            this._ingredientUseCase
                .createIngredient(this.ingredientForm.value as IngredientDto)
                .subscribe(() => {
                    alert('Ingrediente cadastrado com sucesso!');
                    this._router.navigate(['/admin/estoque/ingredientes']);
                });
        } else {
            console.log('Formulário inválido');
        }
    }
}
