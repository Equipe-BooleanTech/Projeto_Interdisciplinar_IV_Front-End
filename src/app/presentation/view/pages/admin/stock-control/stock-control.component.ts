import { AfterViewInit, Component } from '@angular/core';
import { PieChartOptions, PieMetrics } from '@domain/static/interfaces';
import {
    ButtonComponent,
    CardComponent,
    PieComponent,
    SidebarComponent,
} from '@presentation/view/components';

import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-stock-control',
    standalone: true,
    imports: [SidebarComponent, CardComponent, ButtonComponent, PieComponent],
    templateUrl: './stock-control.component.html',
    styles: ``,
})
export class StockControlComponent implements AfterViewInit {
    constructor() {}

    metrics: PieMetrics = {
        title: 'Proporções de estoque',
        dateRange: '08/10/2023 - 08/10/2024',
        options: [
            { href: '#', text: 'Exportar' },
            { href: '#', text: 'Compartilhar' },
        ],
    };
    data: PieChartOptions = {
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
                labels: {
                    show: true,
                },
                size: '100%',
                dataLabels: {
                    offset: -25,
                },
            },
        },
        labels: ['Ingredientes', 'Fornecedores', 'Fichas Técnicas', 'Pratos'],
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
}
