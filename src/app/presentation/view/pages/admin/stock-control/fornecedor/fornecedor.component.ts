import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterSupplierDto } from '@domain/dtos/admin/register-supplier.usecase.dto/register-supplier.usecase.dto';
import { supplierFileds } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { RegisterSupplierUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

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
    suppliersFields = supplierFileds;
    collaboratorForm: any;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _router: Router,
        private _registerSupplierUseCase: RegisterSupplierUseCase,
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.supplierForm = this._fb.group(
            this.suppliersFields.fields.reduce(
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

    onSubmit(): void {
        if (this.supplierForm.valid) {
            console.log(this.supplierForm.value);
            this._registerSupplierUseCase
                .registerSupplier(
                    this.supplierForm.value as RegisterSupplierDto,
                )
                .subscribe((response) => {
                    alert('Fornecedor cadastrado com sucesso!');
                    this._router.navigate(['/admin/estoque/fornecedores']);
                });
        } else {
            console.log('Formulário inválido');
        }
    }
}
