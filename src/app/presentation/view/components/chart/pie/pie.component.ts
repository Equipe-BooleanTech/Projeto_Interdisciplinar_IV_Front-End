import { Component, Input, AfterViewInit } from '@angular/core';
import { ChartMetrics, PieChartOptions } from '@domain/interfaces';

interface ChartData {
    title: string;
    dateRange: string;
    options: { href: string; text: string }[];
}
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
    @Input() metrics: ChartMetrics<ChartData> | undefined;

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
