import { AfterViewInit, Component, Input } from '@angular/core';
import {
    LineColumnChartOptions,
    LineColumnMetrics,
} from '@domain/static/interfaces';
import ApexCharts from 'apexcharts';

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
