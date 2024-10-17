import { Component } from '@angular/core';
import {
    LineColumnChartOptions,
    LineColumnMetrics,
} from '@domain/static/interfaces';
import { CardComponent, ButtonComponent } from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-cash-flow',
    standalone: true,
    imports: [SidebarComponent, LineColumnComponent, CardComponent, ButtonComponent],
    templateUrl: './cash-flow.component.html',
    styles: ``,
})
export class CashFlowComponent {
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
                name: 'Fauramento Total',
                color: '#A21420',
                data: [
                    { x: 'Segunda-feira', y: 250 },
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
                    { x: 'Segunda-feira', y: 500 },
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
}
