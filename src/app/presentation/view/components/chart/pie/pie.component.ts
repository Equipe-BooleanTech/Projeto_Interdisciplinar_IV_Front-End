import { Component, Input } from '@angular/core';
import { PieChartOptions, PieMetrics } from '@domain/static/interfaces';

@Component({
    selector: 'app-pie',
    standalone: true,
    imports: [],
    templateUrl: './pie.component.html',
    styles: ``,
})
export class PieComponent {
    constructor() {}
    @Input() options: PieChartOptions | undefined;
    @Input() metrics: PieMetrics | undefined;
    @Input() id: string | undefined;
}
