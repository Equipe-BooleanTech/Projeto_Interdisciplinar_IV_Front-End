import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollaboratorDto, PaginatedResponse } from '@domain/dtos';
import {
    LineColumnChartOptions,
    LineColumnMetrics,
    TableConfig,
} from '@domain/static/interfaces';
import { CollaboratorUseCase } from '@domain/usecases';
import {
    CardComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/security';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        LineColumnComponent,
        TableComponent,
    ],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscription: Subscription | null = null;
    collaboratorName: string = '';
    currentPage = 1;
    pageSize = 3;

    constructor(
        private location: Location,
        private collaboratorUseCase: CollaboratorUseCase,
        private _tokenService: TokenService,
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
                            action: 'Ver mais',
                        },
                        componentType: ['text', 'text', 'text', 'button'],
                    }));
            },
        );

        this.fetchCollaborators();
        this.fetchCurrentCollaboratorName();
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
        action: string;
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
