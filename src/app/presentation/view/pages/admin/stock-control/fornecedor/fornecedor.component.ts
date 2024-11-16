import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierDto } from '@domain/dtos';
import { supplierFileds } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { SuppliersUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-fornecedor',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
    ] as const,
    templateUrl: './fornecedor.component.html',
    styles: ``,
})
export class FornecedorComponent implements OnInit {
    supplierForm: FormGroup = new FormGroup({});
    suppliersFormFields = supplierFileds;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _router: Router,
        private _suppliersUseCase: SuppliersUseCase,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this._initForm();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }

    protected retrieveHttpMethod() {
        return this.router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._suppliersUseCase
                .getSupplierById(this.route.snapshot.params['id'])
                .subscribe((supplier) => {
                    // Dynamically map the supplier data to the form fields
                    this.suppliersFormFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                supplier,
                                fieldName,
                            )
                        ) {
                            field.value = supplier[
                                fieldName as keyof SupplierDto
                            ] as string;
                        }
                    });

                    // After populating the fields, update the form values
                    this._updateFormValues();
                });
        }
    }

    private _initForm(): void {
        this.supplierForm = this._fb.group(
            this.suppliersFormFields.fields.reduce(
                (formFields, field) => {
                    formFields[field.name] = [
                        field.value,
                        this._formValidateService.bindValidations(
                            field.validations,
                        ),
                    ];
                    return formFields;
                },
                {} as { [key: string]: [string, Validators | null] },
            ),
        );
    }

    private _updateFormValues() {
        const updatedValues = this.suppliersFormFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value;
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.supplierForm.patchValue(updatedValues);
    }

    onSubmit(): void {
        if (this.retrieveHttpMethod() === 'POST') {
            this._suppliersUseCase
                .registerSupplier({
                    ...this.supplierForm.value,
                } as SupplierDto)
                .subscribe({
                    next: (response: SupplierDto) => {
                        this.toastr.success(
                            'Fornecedor cadastrado com sucesso!',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                '/admin/estoque/fornecedores',
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao cadastrar fornecedor'),
                });
        } else {
            this._suppliersUseCase
                .updateSupplier(
                    this.route.snapshot.params['id'],
                    this.supplierForm.value,
                )
                .subscribe({
                    next: (response: SupplierDto) => {
                        this.toastr.success(
                            'Fornecedor atualizado com sucesso!',
                        );
                        setTimeout(() => {
                            this._router.navigate([
                                '/admin/estoque/fornecedores',
                            ]);
                        }, 3000);
                    },
                    error: () =>
                        this.toastr.error('Erro ao atualizar fornecedor'),
                });
        }
    }
}
