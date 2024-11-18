import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { Subscription } from 'rxjs';
import { FinanceGroupUsecase } from '@domain/usecases';
import { ActivatedRoute } from '@angular/router';
import { ExpenseDto, FinanceGroupDto, RevenueDto } from '@domain/dtos';

@Component({
    selector: 'app-grupo-financas',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent, CommonModule],
    templateUrl: './grupo-financas.component.html',
    styles: ``,
})
export class GrupoFinancasComponent implements OnInit {
    private subscription: Subscription | null = null;
    private financeGroupData: FinanceGroupDto | null = null;

    groupName = '';
    currentPage = 1;
    pageSize = 3;
    totalItems = 0;
    totalPages = 0;

    constructor(
        private _route: ActivatedRoute,
        private _financeGroupUseCase: FinanceGroupUsecase,
    ) {}

    ngOnInit(): void {
        this._retrieveFinanceGroup();
    }

    private _retrieveFinanceGroup(): void {
        this._route.paramMap.subscribe((params) => {
            const id: string = params.get('id') || '';
            this.subscription = this._financeGroupUseCase
                .getFinanceGroupById(id)
                .subscribe((response: FinanceGroupDto) => {
                    if (response) {
                        this.financeGroupData = response; // Salva os dados na propriedade
                        this.groupName = response.name;
                        this._loadFinances(); // Chama o método sem parâmetros
                    }
                });
        });
    }

    protected getGroupLink() {
        const id: string = this._route.snapshot.params['id'];
        return `admin/controle-caixa/financas/editar-grupo/${id}`;
    }

    private _loadFinances(): void {
        if (!this.financeGroupData) {
            return; // Garante que os dados estejam disponíveis
        }

        const { expenses, revenues } = this.financeGroupData;

        // Configura os dados da tabela com despesas e receitas
        this.tabela.data = expenses
            .map((expense: ExpenseDto) => ({
                rowData: {
                    tipo: 'Despesa',
                    valor: expense.amount,
                    acao: {
                        text: 'Ver mais',
                        url: `/admin/controle-caixa/financas/editar-despesa/${expense.id}`,
                    },
                },
                componentType: ['text', 'text', 'button'],
            }))
            .concat(
                revenues.map((revenue: RevenueDto) => ({
                    rowData: {
                        tipo: 'Receita',
                        valor: revenue.amount,
                        acao: {
                            text: 'Ver mais',
                            url: `/admin/controle-caixa/financas/editar-receita/${revenue.id}`,
                        },
                    },
                    componentType: ['text', 'text', 'button'],
                })),
            );

        // Atualiza os dados de paginação
        this.totalItems = expenses.length + revenues.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.tabela.pagination.totalItems = this.totalItems;

        // Atualiza as métricas
        this.tabela.metrics = `Total: ${this.totalItems} transações`;
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
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
        title: 'Grupo de finanças',
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
