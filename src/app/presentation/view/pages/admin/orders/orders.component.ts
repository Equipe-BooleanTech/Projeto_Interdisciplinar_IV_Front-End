import { Component } from '@angular/core';
import { LineColumnChartOptions, LineColumnMetrics } from '@domain/interfaces';
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
    chartMetrics: LineColumnMetrics = {
        grossAmount: 5000,
        shortDescription: 'Faturamento Total',
        metric: 'R$',
        title: 'Vendas',
        total: 5000,
        average: 5000,
    };
    chartData: LineColumnChartOptions<{ x: string; y: number }> = {
        colors: ['#A21420', '#FDBA8C'],
        series: [
            {
                name: 'Gastos Totais',
                color: '#FF4500',
                data: [
                    { x: 'Segunda-feira', y: 300 },
                    { x: 'Terça-feira', y: 150 },
                    { x: 'Quarta-feira', y: 80 },
                    { x: 'Quinta-feira', y: 350 },
                    { x: 'Sexta-feira', y: 200 },
                    { x: 'Sábado', y: 400 },
                    { x: 'Domingo', y: 120 },
                ],
            },
            {
                name: 'Recebidos Totais',
                color: '#32CD32',
                data: [
                    { x: 'Segunda-feira', y: 600 },
                    { x: 'Terça-feira', y: 200 },
                    { x: 'Quarta-feira', y: 500 },
                    { x: 'Quinta-feira', y: 300 },
                    { x: 'Sexta-feira', y: 700 },
                    { x: 'Sábado', y: 500 },
                    { x: 'Domingo', y: 300 },
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
}