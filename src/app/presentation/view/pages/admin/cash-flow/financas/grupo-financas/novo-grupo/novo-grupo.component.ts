import { Component, OnInit } from '@angular/core';
import {
    ExpensesUseCase,
    FinanceGroupUsecase,
    RevenuesUseCase,
} from '@domain/usecases';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { financeGroup } from '@domain/static/data/forms/finance-group/finance.group';
import { FormValidateService } from '@domain/static/services';
import { DefaultResponseDto, ExpenseDto, RevenueDto } from '@domain/dtos';
import {
    ButtonComponent,
    FormComponent,
    SidebarComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import {
    CommonModule,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    constructor(
        private _expensesUseCase: ExpensesUseCase,
        private _revenuesUseCase: RevenuesUseCase,
        private _fb: FormBuilder,
        private _formValidateService: FormValidateService,
        private _financeGroupUseCase: FinanceGroupUsecase,
        private toastr: ToastrService,
    ) {}

    financeGroupForm: FormGroup = new FormGroup({});
    fields = financeGroup;
    expenses: ExpenseDto[] = [];
    revenues: RevenueDto[] = [];

    ngOnInit() {
        this._fetchFinances();
        this._initForm();
    }

    private _initForm(): void {
        this.financeGroupForm = this._fb.group(
            this.fields.fields.reduce(
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

    private _fetchFinances() {
        const expensesRequest = this._expensesUseCase
            .getExpenses(0, 9999)
            .subscribe((response) => {
                const expensesOptions = response.content.map((expense) => ({
                    value: expense.category,
                    label: expense.category + ' - ' + expense.description,
                }));
                const expensesField = this.fields.fields.find(
                    (field) => field.name === 'expenses',
                );
                if (expensesField) {
                    expensesField.options = expensesOptions;
                }
            });

        const revenuesRequest = this._revenuesUseCase
            .getRevenues(0, 9999)
            .subscribe((response) => {
                const revenuesOptions = response.content.map((revenue) => ({
                    value: revenue.paymentDate,
                    label: 'Receita datada em: ' + revenue.paymentDate,
                }));
                const revenuesField = this.fields.fields.find(
                    (field) => field.name === 'revenues',
                );
                if (revenuesField) {
                    revenuesField.options = revenuesOptions;
                }
            });
    }

    private _sendForm(): void {
        this._financeGroupUseCase
            .createFinanceGroup(this.financeGroupForm.value)
            .subscribe({
                next: (response) => {
                    this.toastr.success(
                        'Grupo de finanças cadastrado com sucesso!',
                        'Sucesso',
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                },
                error: (error: DefaultResponseDto) => {
                    this.toastr.error(
                        'Ocorreu um erro ao cadastrar o grupo de finanças. Tente novamente!',
                        'Oops..',
                    );
                },
            });
    }

    onSubmit(): void {
        if (this.financeGroupForm.valid) {
            this._sendForm();
        } else {
            console.log('Formulário inválido');
        }
    }
}
