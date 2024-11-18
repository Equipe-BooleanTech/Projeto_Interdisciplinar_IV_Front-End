import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { ExpensesUseCase, RevenuesUseCase } from '@domain/usecases';
import { ExpenseDto, RevenueDto } from '@domain/dtos';
import { Subscription, forkJoin } from 'rxjs';

@Component({
    selector: 'app-ultimas-transacoes',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './ultimas-transacoes.component.html',
    styles: ``,
})
export class UltimasTransacoesComponent implements OnInit, OnDestroy {
    private subscription: Subscription | null = null;
    currentPage = 1;
    pageSize = 3;
    totalItems = 0;
    totalPages = 0;

    constructor(
        private _revenuesUseCase: RevenuesUseCase,
        private _expensesUseCase: ExpensesUseCase,
    ) {}

    ngOnInit() {
        this.loadTransactions();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadTransactions();
        }
    }

    private loadTransactions() {
        // Carregar receitas e despesas simultaneamente
        this.subscription = forkJoin([
            this._revenuesUseCase.getRevenues(
                this.currentPage - 1,
                this.pageSize,
            ),
            this._expensesUseCase.getExpenses(
                this.currentPage - 1,
                this.pageSize,
            ),
        ]).subscribe(([revenueResponse, expenseResponse]) => {
            // Processar receitas e despesas
            const revenueData = this.processTransactions(
                revenueResponse.content,
                'Receita',
            );
            const expenseData = this.processTransactions(
                expenseResponse.content,
                'Despesa',
            );

            // Combina receitas e despesas em uma única lista
            const combinedData = [...revenueData, ...expenseData];

            // Atualiza a tabela com as transações combinadas
            this.tabela.data = combinedData;

            // Atualiza as métricas
            this.totalItems =
                revenueResponse.totalElements + expenseResponse.totalElements;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            this.tabela.metrics = `Total: ${this.totalItems} transações`;

            // Atualiza a configuração da paginação
            this.tabela.pagination = {
                pageRange: 1,
                totalItems: this.totalItems,
                totalPages: this.totalPages,
                onPageChange: (page: number) => this.onPageChange(page),
            };
        });
    }

    private processTransactions(
        data: RevenueDto[] | ExpenseDto[],
        tipo: string,
    ) {
        return data.map((item: RevenueDto | ExpenseDto) => ({
            rowData: {
                tipo: tipo,
                valor: item.amount,
                acao: {
                    text: 'Ver mais',
                    url:
                        tipo === 'Receita'
                            ? `/admin/controle-caixa/financas/editar-receita/${(item as RevenueDto).id}`
                            : `/admin/controle-caixa/financas/editar-despesa/${(item as ExpenseDto).id}`,
                },
            },
            componentType: ['text', 'text', 'button'],
        }));
    }

    tabela: TableConfig<{
        tipo: string;
        valor: number;
        acao: {
            text: string;
            url: string;
        };
    }> = {
        rowOrder: ['tipo', 'valor', 'acao'],
        title: 'Últimas Transações',
        filters: [],
        metrics: '',
        header: ['Tipo de Transação', 'Valor', 'Detalhes'],
        data: [],
        search: {
            onSearch: (value: string) => {
                console.log(value);
            },
            placeholder: 'Buscar por valor...',
            value: '',
        },
        pagination: {
            pageRange: 1,
            totalItems: this.totalItems,
            totalPages: this.totalPages,
            onPageChange: (page: number) => this.onPageChange(page),
        },
    };
}
