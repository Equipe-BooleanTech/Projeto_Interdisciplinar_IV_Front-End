import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PieChartOptions, PieMetrics } from '@domain/static/interfaces';
import {
    ButtonComponent,
    CardComponent,
    PieComponent,
    SidebarComponent,
} from '@presentation/view/components';

import {
    DataSheetDto,
    IngredientDto,
    ListByPeriodResponse,
    SupplierDto,
} from '@domain/dtos';
import {
    DataSheetUseCase,
    IngredientsUseCase,
    SuppliersUseCase,
} from '@domain/usecases';

import ApexCharts from 'apexcharts';

import { NgForOf } from '@angular/common';
import { API_URL } from '@shared/constants';
import { getCurrentWeek, getPastWeek, generateReport } from '@domain/utils';
type UseCaseType = 'ingredients' | 'suppliers' | 'datasheets';

interface CardData {
    name: string;
    percentageChange: number;
    metric: string;
    useCase: UseCaseType;
    apiConfig: {
        endpoint: string;
        params?: Record<string, any>;
    };
    iconClass: string;
    metricTitle: string;
}

@Component({
    selector: 'app-stock-control',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        ButtonComponent,
        PieComponent,
        NgForOf,
    ],
    templateUrl: './stock-control.component.html',
    styles: ``,
})
export class StockControlComponent implements OnInit, AfterViewInit {
    constructor(
        private _ingredientsUseCase: IngredientsUseCase,
        private _suppliersUseCase: SuppliersUseCase,
        private _dataSheetUseCase: DataSheetUseCase,
    ) {}

    data: PieChartOptions = {} as PieChartOptions;
    metrics: PieMetrics = {} as PieMetrics;
    cardData: CardData[] = [];
    apiBase: string = API_URL;

    ngOnInit(): void {
        this.initializeCards();
        this._loadMetrics();
        this._calculatePercentagesForCards();
        this._initializeGraphic();
    }

    private initializeCards(): void {
        this.cardData = [
            {
                name: 'Ingredientes',
                percentageChange: 0,
                metric: '',
                useCase: 'ingredients',
                apiConfig: {
                    endpoint: `${this.apiBase}/api/products/list-ingredients-by-period`,
                    params: { category: 'food' },
                },
                iconClass: 'icon-[icon-park-outline--tomato]',
                metricTitle: 'Ingredientes',
            },
            {
                name: 'Fornecedores',
                percentageChange: 0,
                metric: '',
                useCase: 'suppliers',
                apiConfig: {
                    endpoint: `${this.apiBase}/api/products/list-suppliers-by-period`,
                },
                iconClass: 'icon-[streamline--store-1]',
                metricTitle: 'Fornecedores',
            },
            {
                name: 'Fichas Cadastradas',
                percentageChange: 0,
                metric: '',
                useCase: 'datasheets',
                apiConfig: {
                    endpoint: `${this.apiBase}/api/products/list-ingredients-by-period`,
                },
                iconClass: 'icon-[fluent--form-sparkle-20-regular]',
                metricTitle: 'Fichas Cadastradas',
            },
        ];
    }

    private async _calculatePercentagesForCards(): Promise<void> {
        const currentWeek = getCurrentWeek();
        const pastWeek = getPastWeek();

        for (const card of this.cardData) {
            try {
                const useCase = this._getUseCase(card.useCase);
                const listMethodName = this._getListMethodName(card.useCase);

                // Fetch data for the current week
                const currentWeekData = await new Promise<number>((resolve) => {
                    useCase[listMethodName]({
                        ...card.apiConfig.params,
                        startDate: currentWeek.startDate,
                        endDate: currentWeek.endDate,
                    }).subscribe({
                        next: (
                            response: ListByPeriodResponse<
                                IngredientDto | SupplierDto | DataSheetDto
                            >,
                        ) => resolve(response.total),
                    });
                });

                // Fetch data for the past week
                const pastWeekData = await new Promise<number>((resolve) => {
                    useCase[listMethodName]({
                        ...card.apiConfig.params,
                        startDate: pastWeek.startDate,
                        endDate: pastWeek.endDate,
                    }).subscribe({
                        next: (
                            response: ListByPeriodResponse<
                                IngredientDto | SupplierDto | DataSheetDto
                            >,
                        ) => resolve(response.total),
                    });
                });

                card.percentageChange = Math.floor(
                    ((currentWeekData - pastWeekData) / pastWeekData) * 100,
                );
            } catch (error) {
                console.error(
                    `Erro ao calcular a porcentagem para o card ${card.name}:`,
                    error,
                );
            }
        }
    }

    private _getUseCase(useCaseType: UseCaseType): any {
        switch (useCaseType) {
            case 'ingredients':
                return this._ingredientsUseCase;
            case 'suppliers':
                return this._suppliersUseCase;
            case 'datasheets':
                return this._dataSheetUseCase;
            default:
                return null;
        }
    }

    private _getListMethodName(useCaseType: UseCaseType): string {
        switch (useCaseType) {
            case 'ingredients':
                return 'listIngredientsPerWeek';
            case 'suppliers':
                return 'listSuppliersPerWeek';
            case 'datasheets':
                return 'listDataSheetPerWeek';
            default:
                throw new Error(`Método não configurado para o use case`);
        }
    }

    private _loadMetrics(): void {
        const currentWeek = getCurrentWeek();
        for (const card of this.cardData) {
            const useCase = this._getUseCase(card.useCase);
            const listMethodName = this._getListMethodName(card.useCase);

            useCase[listMethodName]({
                ...card.apiConfig.params,
                startDate: currentWeek.startDate,
                endDate: currentWeek.endDate,
            }).subscribe(
                (
                    response: ListByPeriodResponse<
                        IngredientDto | SupplierDto | DataSheetDto
                    >,
                ) => {
                    card.metric = response.total.toString();
                },
            );
        }
    }

    onGenerateReport(): void {
        const sections = [
            {
                title: 'Ingredientes',
                fetchData: this._ingredientsUseCase.listIngredientsPerWeek,
                formatItem: (item: IngredientDto) =>
                    `- ${item.name}: ${item.quantity} ${item.unit}`,
            },
            {
                title: 'Fornecedores',
                fetchData: this._suppliersUseCase.listSuppliersPerWeek,
                formatItem: (item: SupplierDto) =>
                    `- ${item.name} (Contato: ${item.contact}, Telefone: ${item.phone})`,
            },
            {
                title: 'Fichas Técnicas',
                fetchData: this._dataSheetUseCase.listDataSheetPerWeek,
                formatItem: (item: DataSheetDto) =>
                    `- ${item.name} (Criada em: ${item.createdAt})`,
            },
        ];

        // Chama a função para gerar o relatório PDF
        generateReport(sections);
    }
    private _initializeGraphic() {
        this.metrics = {
            title: 'Proporções de estoque',
            dateRange: '08/10/2023 - 08/10/2024',
            options: [
                { href: '#', text: 'Exportar' },
                { href: '#', text: 'Compartilhar' },
            ],
        };
        this.data = {
            type: 'pie',
            series: [12.8, 26.8, 20.4, 40],
            colors: ['#740318', '#FDBA8C', '#118632', '#F4BE3775'],
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
                    labels: { show: true },
                    size: '100%',
                    dataLabels: { offset: -25 },
                },
            },
            labels: [
                'Ingredientes',
                'Fornecedores',
                'Fichas Técnicas',
                'Pratos',
            ],
            dataLabels: {
                enabled: true,
                style: { fontFamily: 'DM Sans, sans-serif' },
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
                axisTicks: { show: false },
                axisBorder: { show: false },
            },
        };
    }

    ngAfterViewInit(): void {
        try {
            console.log(this.data); // Verifique os dados
            const chartElement = document.getElementById('stock-chart');
            if (chartElement && typeof ApexCharts !== 'undefined') {
                if (this.data && this.data.type) {
                    // Verifique se 'type' está definido
                    const chart = new ApexCharts(chartElement, this.data);
                    chart.render();
                }
            }
        } catch (error) {}
    }
}
