import { Component } from '@angular/core';
import { LineColumnChartOptions, LineColumnMetrics } from '@domain/static/interfaces';
import {
    CardComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        LineColumnComponent,
        TableComponent,
    ],
    templateUrl: './orders.component.html',
    styles: ``,
})
export class OrdersComponent {

    chartData: LineColumnChartOptions<{ x: string; y: number }> = {
        colors: ['#A21420', '#34A853'],
        series: [
            {
                name: 'Gastos',
                color: '#A21420',
                data: [
                    { x: 'Semana 1', y: -30 },
                    { x: 'Semana 2', y: -50 },
                    { x: 'Semana 3', y: -40 },
                    { x: 'Semana 4', y: -35 },
                ],
            },
            {
                name: 'Recebidos',
                color: '#34A853',
                data: [
                    { x: 'Semana 1', y: 60 },
                    { x: 'Semana 2', y: 45 },
                    { x: 'Semana 3', y: 50 },
                    { x: 'Semana 4', y: 55 },
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
        grossAmount: 25000,
        shortDescription: 'Faturamento de pedidos nos últimos 30 dias',
        metric: 'pedidos',
        title: 'pedidos',
        total: 120,
        average: 32,
    };
    

}