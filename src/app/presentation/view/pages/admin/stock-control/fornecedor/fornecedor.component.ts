import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    collaboratorForm: any;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _router: Router,
        private _suppliersUseCase: SuppliersUseCase,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this._initForm();
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

    onSubmit(): void {
        if (this.supplierForm.valid) {
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
                        this._router.navigate(['/admin/estoque/fornecedores']);
                    }, 3000);
                },
                error: () => 
                    this.toastr.error('Erro ao cadastrar fornecedor'),
                });
            }else {
                this.toastr.error('Erro ao cadastrar fornecedor');
            }   
        }     
    }    

