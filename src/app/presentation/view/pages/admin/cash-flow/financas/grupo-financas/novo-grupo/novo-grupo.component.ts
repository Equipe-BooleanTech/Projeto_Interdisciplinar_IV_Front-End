import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import {
    CommonModule,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
} from '@angular/common';
import { FormValidateService } from '@domain/static/services';
import {
    ExpensesUseCase,
    FinanceGroupUsecase,
    RevenuesUseCase,
} from '@domain/usecases';
import { ToastrService } from 'ngx-toastr';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { financeGroup } from '@domain/static/data/forms/finance-group/finance.group';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-novo-grupo',
    standalone: true,
    imports: [
        ButtonComponent,
        FormComponent,
        FormInputComponent,
        NgForOf,
        SidebarComponent,
        NgSwitch,
        ReactiveFormsModule,
        NgSwitchCase,
        NgIf,
        CommonModule,
    ],
    templateUrl: './novo-grupo.component.html',
    styles: ``,
})
export class NovoGrupoFinancasComponent implements OnInit {
    financeGroupForm: FormGroup = new FormGroup({});
    fields = financeGroup;

    constructor(
        private _expensesUseCase: ExpensesUseCase,
        private _revenuesUseCase: RevenuesUseCase,
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _financeGroupUseCase: FinanceGroupUsecase,
        private toastr: ToastrService,
        private _router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this._initForm();
        this._loadFinances();
        if (this.retrieveHttpMethod() === 'PUT') {
            this.retrieveFormFields();
        }
    }

    private _loadFinances(): void {
        this._expensesUseCase.getExpenses(0, 9999).subscribe((response) => {
            const expensesOptions = response.content.map((expense) => ({
                value: String(expense.id),
                label: `${this.convertExpenseCategory(expense.category)} - R$${expense.amount.toFixed(2)}`,
            }));

            const expensesField = this.fields.fields.find(
                (field) => field.name === 'expenses',
            );
            if (expensesField) {
                expensesField.options = expensesOptions;
            }
        });

        this._revenuesUseCase.getRevenues(0, 9999).subscribe((response) => {
            const revenuesOptions = response.content.map((revenue) => ({
                value: String(revenue.id),
                label: `#${revenue.id} - R$${revenue.amount.toFixed(2)}`,
            }));

            const revenuesField = this.fields.fields.find(
                (field) => field.name === 'revenues',
            );
            if (revenuesField) {
                revenuesField.options = revenuesOptions;
            }
        });
    }

    protected confirmExclusion(): void {
        const confirmation = confirm(
            'Você realmente deseja excluir a receita? Essa ação é irreversível!',
        );

        if (!confirmation) {
            return;
        }

        this._financeGroupUseCase
            .deleteFinanceGroup(this.route.snapshot.params['id'])
            .subscribe({
                next: () => {
                    this.toastr.success(
                        'Grupo de finanças excluído com sucesso! Redirecionando...',
                    );
                    setTimeout(() => {
                        this._router.navigate([
                            '/admin/controle-caixa/financas',
                        ]);
                    }, 3000);
                },
                error: () => {
                    this.toastr.error(
                        'Ocorreu um erro ao excluir o grupo de finanças. Tente novamente.',
                        'Oops...',
                    );
                },
            });
    }

    private convertExpenseCategory(category: string) {
        switch (category) {
            case 'INGREDIENTS':
                return 'Ingredientes';
            case 'SALARIES':
                return 'Salários';
            case 'MAINTENANCE':
                return 'Manutenções';
            case 'WATER_BILL':
                return 'Conta de água';
            case 'ELECTRICITY_BILL':
                return 'Conta de luz';
            case 'OTHERS':
                return 'Outros';
            default:
                return category;
        }
    }

    protected retrieveHttpMethod() {
        return this._router.url.includes('/editar') ? 'PUT' : 'POST';
    }

    private retrieveFormFields() {
        if (this.retrieveHttpMethod() === 'PUT') {
            this._financeGroupUseCase
                .getFinanceGroupById(this.route.snapshot.params['id'])
                .subscribe((group) => {
                    this.fields.fields.forEach((field) => {
                        const fieldName = field.name;
                        if (
                            Object.prototype.hasOwnProperty.call(
                                group,
                                fieldName,
                            )
                        ) {
                            field.value = (group as any)[fieldName];
                        }
                    });
                    this._updateFormValues();
                });
        }
    }

    private _initForm(): void {
        this.financeGroupForm = this._fb.group(
            this.fields.fields.reduce(
                (formFields, field) => {
                    const fieldValue =
                        field.value ?? (Array.isArray(field.value) ? [] : '');
                    const validations = field.validations
                        ? this._formValidateService.bindValidations(
                              field.validations,
                          )
                        : null;
                    formFields[field.name] = [fieldValue, validations];
                    return formFields;
                },
                {} as {
                    [key: string]: [string | string[], ValidatorFn | null];
                },
            ),
        );
    }

    private _updateFormValues(): void {
        const updatedValues = this.fields.fields.reduce(
            (acc, field) => {
                if (field.name === 'expenses' || field.name === 'revenues') {
                    acc[field.name] = field.value;
                } else {
                    acc[field.name] = field.value ?? '';
                }
                return acc;
            },
            {} as { [key: string]: string | string[] },
        );
        this.financeGroupForm.patchValue(updatedValues);
    }

    onSubmit(): void {
        if (this.financeGroupForm.valid) {
            const formattedResponse = {
                ...this.financeGroupForm.value,
                expenses: this.financeGroupForm.value.expenses.map(
                    (id: string) => ({ id }),
                ),
                revenues: this.financeGroupForm.value.revenues.map(
                    (id: string) => ({ id }),
                ),
            };
            this._sendForm(formattedResponse);
        } else {
            console.log('Formulário inválido');
        }
    }

    private _sendForm(formattedResponse: any): void {
        if (this.retrieveHttpMethod() === 'POST') {
            this._financeGroupUseCase
                .createFinanceGroup(formattedResponse)
                .subscribe({
                    next: () => {
                        this.toastr.success(
                            'Grupo de finanças cadastrado com sucesso!',
                        );
                        setTimeout(() => window.location.reload(), 3000);
                    },
                    error: () => {
                        this.toastr.error(
                            'Erro ao cadastrar grupo de finanças',
                        );
                    },
                });
        } else {
            this._financeGroupUseCase
                .updateFinanceGroup(
                    this.route.snapshot.params['id'],
                    formattedResponse,
                )
                .subscribe({
                    next: () => {
                        this.toastr.success(
                            'Grupo de finanças atualizado com sucesso!',
                        );
                        setTimeout(() => window.location.reload(), 3000);
                    },
                    error: () => {
                        this.toastr.error(
                            'Erro ao atualizar grupo de finanças',
                        );
                    },
                });
        }
    }
}
