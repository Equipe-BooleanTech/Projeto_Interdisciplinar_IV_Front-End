import { Component, AfterViewInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts';
import { ChartMetrics, ChartOptions } from '@domain/interfaces';

interface ChartData {
    grossAmount: number;
    shortDescription: string;
    metric: string;
    title: string;
    total: number;
    average: number;
}

@Component({
    standalone: true,
    selector: 'app-line-column',
    templateUrl: './line-column.component.html',
})
export class LineColumnComponent implements AfterViewInit {
    @Input() options:
        | ChartOptions<{
              x: string;
              y: number;
          }>
        | undefined;

    @Input() metrics: ChartMetrics<ChartData> | undefined;

    constructor() {}
    ngAfterViewInit(): void {
        if (
            document.getElementById('column-chart') &&
            typeof ApexCharts !== 'undefined'
        ) {
            const chart = new ApexCharts(
                document.getElementById('column-chart'),
                this.options,
            );
            chart.render();
        }
    }
}
