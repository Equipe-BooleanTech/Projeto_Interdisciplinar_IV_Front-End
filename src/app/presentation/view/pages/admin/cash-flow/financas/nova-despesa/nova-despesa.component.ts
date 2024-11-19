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
import { DefaultResponseDto, ExpenseDto, SupplierDto } from '@domain/dtos';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this._initForm();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }
    onSubmit(): void {
        if (this.retrieveHttpMethod() === 'POST') {
            this._expenseUseCase
                .createExpense({
                    ...this.expenseForm.value,
                } as ExpenseDto)
                .subscribe({
                    next: (response: ExpenseDto) => {
                        this.toastr.success(
                            'Despesa cadastrada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this.router.navigate([
                                '/admin/controle-caixa/financas',
                            ]);
                        }, 3000);
                    },
                    error: () => this.toastr.error('Erro ao cadastrar despesa'),
                });
        } else {
            this._expenseUseCase
                .updateExpense(
                    this.route.snapshot.params['id'],
                    this.expenseForm.value,
                )
                .subscribe({
                    next: (response: ExpenseDto) => {
                        this.toastr.success(
                            'Despesa atualizada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            this.router.navigate([
                                '/admin/controle-caixa/financas',
                            ]);
                        }, 3000);
                    },
                    error: () => this.toastr.error('Erro ao atualizar despesa'),
                });
        }
    }

    protected retrieveHttpMethod() {
        return this.router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._expenseUseCase
                .getExpenseById(this.route.snapshot.params['id'])
                .subscribe((expense) => {
                    this.expenseFormFields.fields.forEach((field) => {
                        const fieldName = field.name;

                        if (
                            Object.prototype.hasOwnProperty.call(
                                expense,
                                fieldName,
                            )
                        ) {
                            field.value = expense[
                                fieldName as keyof ExpenseDto
                            ] as string;
                        }
                    });

                    this._updateFormValues();
                });
        }
    }

    private _updateFormValues() {
        const updatedValues = this.expenseFormFields.fields.reduce(
            (acc, field) => {
                acc[field.name] = field.value;
                return acc;
            },
            {} as { [key: string]: string },
        );
        this.expenseForm.patchValue(updatedValues);
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir a despesa? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return;
        }

        this._expenseUseCase
            .deleteExpense(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Despesa excluída com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this.router.navigate([
                            '/admin/controle-caixa/financas',
                        ]);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir a despesa. Tente novamente.',
                        'Oops...',
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
}
