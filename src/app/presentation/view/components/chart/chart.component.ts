import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartMetrics, ChartOptions, LineColumnData } from '@domain/interfaces';
import { LineColumnComponent } from '.';

type ChartData = LineColumnData; //Adicionar mais tipos de gráficos
@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule, LineColumnComponent],
    templateUrl: './chart.component.html',
    styles: ``,
})
export class ChartComponent<T> {
    constructor() {}
    @Input() chartMetrics: ChartMetrics<ChartData> | undefined;
    @Input() chartData: ChartOptions<T> | undefined;
    @Input() type: string | undefined;
}
