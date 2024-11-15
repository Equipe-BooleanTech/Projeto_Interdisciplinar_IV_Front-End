import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { FormValidateService } from '@domain/static/services';
import { expenseFields } from '@domain/static/data/forms/expense/expense';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { CommonModule, NgIf, NgSwitch } from '@angular/common';
import { FormInputComponent } from '@presentation/view/components/form';
import { ExpensesUseCase } from '@domain/usecases';
import { DefaultResponseDto } from '@domain/dtos';
import { ToastrService } from 'ngx-toastr';

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
    templateUrl: './nova-despesa.component.html',
    styles: ``,
})
export class NovaDespesaComponent implements OnInit {
    expenseForm: FormGroup = new FormGroup({});
    expenseFormFields = expenseFields;

    constructor(
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _expenseUseCase: ExpensesUseCase,
        private toastr: ToastrService,
    ) {}
    ngOnInit(): void {
        this._initForm();
    }

    private _sendForm(): void {
        this._expenseUseCase.createExpense(this.expenseForm.value).subscribe({
            next: (response) => {
                this.toastr.success(
                    'Despesa cadastrada com sucesso!',
                    'Sucesso',
                );
            },
            error: (error: DefaultResponseDto) => {
                this.toastr.error(
                    'Ocorreu um erro ao cadastrar a despesa. Certifique-se que possui as permissões necessárias!',
                    'Oops..',
                );
            },
        });
    }

    private _initForm(): void {
        this.expenseForm = this._fb.group(
            this.expenseFormFields.fields.reduce(
                (expenseFields, field) => {
                    expenseFields[field.name] = [
                        field.value || '',
                        this._formValidateService.bindValidations(
                            field.validations || [],
                        ),
                    ];
                    return expenseFields;
                },
                {} as { [key: string]: [string, ValidatorFn | null] },
            ),
        );
    }

    onSubmit(): void {
        if (this.expenseForm.valid) {
            console.log(this.expenseForm.value);
            this._sendForm();
        } else {
            console.log('Formulário inválido');
        }
    }
}
