import { Component } from '@angular/core';
import {
    LineColumnChartOptions,
    LineColumnMetrics,
    TableConfig,
} from '@domain/static/interfaces';
import {
    CardComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';

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
export class DashboardComponent {
    tabela: TableConfig<{
        numero: string;
        data: string;
        nomeCliente: string;
        valor: string;
        status: string;
    }> = {
        rowOrder: ['numero', 'data', 'nomeCliente', 'valor', 'status'],
        title: 'Histórico de Pedidos',
        filters: [
            { isActive: false, text: 'Em entrega' },
            { isActive: false, text: 'Entregues' },
            { isActive: false, text: 'Cancelados' },
        ],
        pagination: {
            pageRange: 10,
            totalItems: 100,
        },
        metrics: 'Total: 5 pedidos',
        header: [
            'Número do Pedido',
            'Data do Pedido',
            'Nome do Cliente',
            'Valor Recebido',
            'Status',
        ],
        data: [
            {
                rowData: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    nomeCliente: 'John Doe',
                    valor: '$948.55',
                    status: 'Shipping',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
            {
                rowData: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    nomeCliente: 'Jane Smith',
                    valor: '$948.55',
                    status: 'Shipping',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
        ],
        search: {
            placeholder: 'Buscar pedido',
            onSearch: (value: string) => {
                console.log(value);
            },
            value: '',
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
