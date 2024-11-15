import { CommonModule, Location } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
    CardList,
    PieChartOptions,
    PieMetrics,
    TableConfig,
} from '@domain/static/interfaces';
import {
    ButtonComponent,
    CardComponent,
    SidebarComponent,
} from '@presentation/view/components';
import {
    LineColumnComponent,
    PieComponent,
} from '@presentation/view/components/chart';
import { ExpenseDto, RevenueDto, PaginatedResponse } from '@domain/dtos';
import ApexCharts from 'apexcharts';
import { CardListComponent } from '../../../../components/card-list/card-list.component';
import { TableComponent } from '../../../../components/table/table.component';
import { Subscription } from 'rxjs';
import { ExpensesUseCase, RevenuesUseCase } from '@domain/usecases';

@Component({
    selector: 'app-painel-contador',
    standalone: true,
    imports: [
        SidebarComponent,
        LineColumnComponent,
        CardComponent,
        TableComponent,
        PieComponent,
        CommonModule,
        ButtonComponent,
        CardListComponent,
    ],

    templateUrl: './painel-contador.component.html',
    styles: ``,
})
export class PainelContadorComponent implements OnInit, AfterViewInit {
    constructor(
        private location: Location,
        private _expensesUseCase: ExpensesUseCase,
        private _revenuesUseCase: RevenuesUseCase,
    ) {}

    subscription: Subscription | null = null;
    currentPage = 1;
    pageSize = 6;

    ngOnInit(): void {
        this._fetchExpenses();
        this._fetchRevenues();
    }

    private _fetchExpenses(): void {
        this._expensesUseCase
            .getExpenses(this.currentPage - 1, this.pageSize)
            .subscribe((response: PaginatedResponse<ExpenseDto>) => {
                this.tabela.data = response.content.map(
                    (expense: ExpenseDto) => ({
                        rowData: {
                            valor: expense.amount.toString(),
                            dataPagamento: expense.paymentDate,
                        },
                        componentType: ['text', 'text'],
                    }),
                );
                this.tabela.pagination.totalItems = response.totalElements;
                this.tabela.pagination.totalPages = Math.ceil(
                    response.totalElements / this.pageSize,
                );
            });
    }

    private _fetchRevenues(): void {
        this._revenuesUseCase
            .getRevenues(this.currentPage - 1, this.pageSize)
            .subscribe((response: PaginatedResponse<RevenueDto>) => {
                this.tabela.data = response.content.map(
                    (revenue: RevenueDto) => ({
                        rowData: {
                            valor: revenue.amount.toString(),
                            dataPagamento: revenue.paymentDate,
                        },
                        componentType: ['text', 'text'],
                    }),
                );
                this.tabela.pagination.totalItems = response.totalElements;
                this.tabela.pagination.totalPages = Math.ceil(
                    response.totalElements / this.pageSize,
                );
            });
    }

    tabela: TableConfig<{
        valor: string;
        dataPagamento: string;
    }> = {
        rowOrder: ['valor', 'dataPagamento'],
        title: 'Ultimas Movimentações',
        filters: [
            { isActive: true, text: 'Últimos 30 dias' },
            { isActive: false, text: 'Últimos 60 dias' },
            { isActive: false, text: 'Últimos 90 dias' },
        ],
        metrics: '',
        header: ['Valor da finança', 'Data da Finança'],
        data: [],
        search: {
            placeholder: '',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
    };

    metrics: PieMetrics = {
        title: '',
        dateRange: '08/10/2023 - 08/10/2024',
        options: [
            { href: '#', text: 'Exportar' },
            { href: '#', text: 'Compartilhar' },
        ],
    };
    data: PieChartOptions = {
        type: 'pie',
        series: [28, 72],
        colors: ['#740318', '#2E7D32'],
        chart: {
            height: '100%',
            width: '100%',
            type: 'pie',
        },
        stroke: {
            colors: ['white'],
            lineCap: '',
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true,
                },
                size: '100%',
                dataLabels: {
                    offset: -25,
                },
            },
        },
        labels: ['Despesas', 'Receitas'],
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: 'DM Sans, sans-serif',
            },
        },
        legend: {
            position: 'bottom',
            fontFamily: 'DM Sans, sans-serif',
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + '%';
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + '%';
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };
    ngAfterViewInit(): void {
        if (
            document.getElementById('stock-chart') &&
            typeof ApexCharts !== 'undefined'
        ) {
            const chart = new ApexCharts(
                document.getElementById('stock-chart'),
                this.data,
            );
            chart.render();
        }
    }

    cardListConfig: CardList = {
        title: 'Teste',
        cards: [
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
        ],
        filters: [],
        metrics: '',
        header: [],
        data: [],
        search: {
            placeholder: '',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
        rowOrder: [],
    };
    voltar() {
        this.location.back();
    }
}
