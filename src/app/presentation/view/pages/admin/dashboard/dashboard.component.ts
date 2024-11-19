import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    CollaboratorDto,
    DataSheetDto,
    IngredientDto,
    ListByPeriodResponse,
    PaginatedResponse,
    SupplierDto,
} from '@domain/dtos';
import {
    LineColumnChartOptions,
    LineColumnMetrics,
    TableConfig,
} from '@domain/static/interfaces';
import {
    CollaboratorUseCase,
    DataSheetUseCase,
    IngredientsUseCase,
    SuppliersUseCase,
} from '@domain/usecases';
import {
    CardComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { Subscription } from 'rxjs';
import { Location, NgForOf } from '@angular/common';
import { TokenService } from 'src/app/security';
import { getCurrentWeek, getPastWeek } from '@domain/utils';
import { API_URL } from '@shared/constants';

type UseCaseType = 'ingredients' | 'suppliers' | 'datasheets' | 'collaborators';

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
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        LineColumnComponent,
        TableComponent,
        NgForOf,
    ],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscription: Subscription | null = null;
    collaboratorName: string = '';
    currentPage = 1;
    pageSize = 3;
    cardData: CardData[] = [];
    apiBase: string = API_URL;

    constructor(
        private location: Location,
        private collaboratorUseCase: CollaboratorUseCase,
        private _tokenService: TokenService,
        private _ingredientsUseCase: IngredientsUseCase,
        private _suppliersUseCase: SuppliersUseCase,
        private _dataSheetsUseCase: DataSheetUseCase,
    ) {}

    ngOnInit(): void {
        this.subscription = this.collaboratorUseCase.base$.subscribe(
            (collaborators: CollaboratorDto[]) => {
                this.tabela.data = collaborators
                    .filter(
                        (collaborator: CollaboratorDto) =>
                            collaborator.fullName,
                    )
                    .map((collaborator: CollaboratorDto) => ({
                        rowData: {
                            role:
                                collaborator.roles === 'ROLE_ADMIN'
                                    ? 'Administrador'
                                    : collaborator.roles === 'ROLE_CHEF'
                                      ? 'Chefe de Cozinha'
                                      : 'Garçom',
                            name: collaborator.fullName,
                            status: collaborator.isEmployee
                                ? 'Ativo'
                                : 'Inativo',
                            action: {
                                url: `/admin/colaboradores/editar-colaborador/${collaborator.id}`,
                                text: 'Ver mais',
                            },
                        },
                        componentType: ['text', 'text', 'text', 'button'],
                    }));
            },
        );

        this.fetchCollaborators();
        this.fetchCurrentCollaboratorName();
        this.initializeCards();
        this._loadMetrics();
        this._calculatePercentagesForCards();
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
                name: 'Fichas Técnicas',
                percentageChange: 0,
                metric: '',
                useCase: 'datasheets',
                apiConfig: {
                    endpoint: `${this.apiBase}/api/products/list-ingredients-by-period`,
                },
                iconClass: 'icon-[fluent--form-sparkle-20-regular]',
                metricTitle: 'Fichas Técnicas',
            },
            {
                name: 'Colaboradores',
                percentageChange: 0,
                metric: '',
                useCase: 'collaborators',
                apiConfig: {
                    endpoint: `${this.apiBase}/api/users/list-users-by-period`,
                },
                iconClass: 'icon-[lucide--users]',
                metricTitle: 'Colaboradores',
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
                                | IngredientDto
                                | SupplierDto
                                | DataSheetDto
                                | CollaboratorDto
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
                                | IngredientDto
                                | SupplierDto
                                | DataSheetDto
                                | CollaboratorDto
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
                return this._dataSheetsUseCase;
            case 'collaborators':
                return this.collaboratorUseCase;
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
            case 'collaborators':
                return 'listCollaboratorsPerWeek';
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
                        | IngredientDto
                        | SupplierDto
                        | DataSheetDto
                        | CollaboratorDto
                    >,
                ) => {
                    card.metric = response.total.toString();
                },
            );
        }
    }

    fetchCollaborators(): void {
        this.collaboratorUseCase
            .getAllCollaborators(this.currentPage - 1, this.pageSize)
            .subscribe((response: PaginatedResponse<CollaboratorDto>) => {
                this.tabela.pagination.totalItems = response.totalElements - 1;
                this.tabela.pagination.totalPages = Math.ceil(
                    response.totalElements / this.pageSize,
                );
                this.tabela.metrics = `Total: ${response.totalElements} colaborador(es)`;
            });
    }

    fetchCurrentCollaboratorName(): void {
        const userId = this._tokenService.getUserId();
        if (userId) {
            this.collaboratorUseCase
                .getCollaboratorById(userId)
                .subscribe((response: CollaboratorDto) => {
                    this.collaboratorName = response.fullName;
                });
        }
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.tabela.pagination.totalPages!) {
            this.currentPage = page;
            this.fetchCollaborators();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    tabela: TableConfig<{
        role: string;
        name: string;
        status: string;
        action: {
            url: string;
            text: string;
        };
    }> = {
        rowOrder: ['name', 'role', 'status', 'action'],
        title: 'Colaboradores Cadastrados e Status',
        filters: [
            { isActive: true, text: 'Todos' },
            { isActive: false, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: '',
        header: ['Nome', 'Função', 'Status', 'Ações'],
        data: [],
        search: {
            placeholder: 'Procure por nome ou função...',
            value: '',
            onSearch: (value: string) => {
                console.log(value);
            },
        },
        pagination: {
            pageRange: 1,
            totalItems: 0,
            totalPages: 0,
            onPageChange: (page: number) => this.onPageChange(page),
        },
    };

    chartData: LineColumnChartOptions<{ x: string; y: number }> = {
        colors: ['#A21420', '#FDBA8C'],
        series: [
            {
                name: 'Fauramento Total',
                color: '#A21420',
                data: [
                    { x: 'Mon', y: 231 },
                    { x: 'Tue', y: 122 },
                    { x: 'Wed', y: 63 },
                    { x: 'Thu', y: 421 },
                    { x: 'Fri', y: 122 },
                    { x: 'Sat', y: 323 },
                    { x: 'Sun', y: 111 },
                ],
            },
            {
                name: 'Faturamento Online',
                color: '#FDBA8C',
                data: [
                    { x: 'Mon', y: 232 },
                    { x: 'Tue', y: 113 },
                    { x: 'Wed', y: 341 },
                    { x: 'Thu', y: 224 },
                    { x: 'Fri', y: 522 },
                    { x: 'Sat', y: 411 },
                    { x: 'Sun', y: 243 },
                ],
            },
        ],
        chart: {
            type: 'bar',
            height: '100%',
            width: '100%',
            fontFamily: 'Dm Sans, sans-serif',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                borderRadiusApplication: 'end',
                borderRadius: 8,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: {
                fontFamily: 'Dm Sans, sans-serif',
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 1,
                },
            },
        },
        stroke: {
            show: true,
            width: 0,
            colors: ['transparent'],
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -14,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            floating: false,
            labels: {
                show: true,
                style: {
                    fontFamily: 'Dm Sans, sans-serif',
                    cssClass:
                        'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
    };

    chartMetrics: LineColumnMetrics = {
        grossAmount: 5000,
        shortDescription: 'Faturamento Bruto',
        metric: 'pedidos',
        title: 'pedidos',
        total: 50,
        average: 32,
    };
}
