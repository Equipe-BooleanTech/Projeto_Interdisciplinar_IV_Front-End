import { Component, Input, AfterViewInit } from '@angular/core';
import { PieChartOptions, PieMetrics } from '@domain/interfaces';

@Component({
    selector: 'app-pie',
    standalone: true,
    imports: [],
    templateUrl: './pie.component.html',
    styles: ``,
})
export class PieComponent implements AfterViewInit {
    constructor() {}
    @Input() options: PieChartOptions | undefined;
    @Input() metrics: PieMetrics | undefined;

    ngAfterViewInit(): void {
        if (
            document.getElementById('pie-chart') &&
            typeof ApexCharts !== 'undefined'
        ) {
            const chart = new ApexCharts(
                document.getElementById('pie-chart'),
                this.options,
            );
            chart.render();
        }
    }
}
