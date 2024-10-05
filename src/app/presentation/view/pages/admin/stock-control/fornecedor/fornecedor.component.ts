import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '../../../../components/form/form-input/form-input.component';
import { supplierFileds } from '@infra/data';
import { FormValidateService } from '@infra/services';

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
    ],
    templateUrl: './fornecedor.component.html',
    styles: ``,
})
export class FornecedorComponent implements OnInit {
    supplierForm: FormGroup = new FormGroup({});
    suppliersFields = supplierFileds;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
    ) {}

    ngOnInit(): void {}

    initForm(): void {
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
            // Adicione aqui a lógica para salvar o fornecedor
        }
    }
}
