import { Component, AfterViewInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts';
import {  LineColumnChartOptions, LineColumnMetrics } from '@domain/interfaces';


@Component({
    standalone: true,
    selector: 'app-line-column',
    templateUrl: './line-column.component.html',
})
export class LineColumnComponent implements AfterViewInit {
    @Input() options:
        | LineColumnChartOptions<{
              x: string;
              y: number;
          }>
        | undefined;

    @Input() chartMetrics: LineColumnMetrics | undefined;

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
