import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [NgClass, NgIf],
    templateUrl: './card.component.html',
    styles: ``,
})
export class CardComponent {
    @Input() isDemographic: boolean = false;
    @Input() iconClass: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() percentageChange: number = 0;
    @Input() isPositive: boolean = false;
    @Input() metricTitle: string = '';
    @Input() metric: string = '';

    @Output() handlePropertyChange = new EventEmitter<{
        key: string;
        value: unknown;
    }>();

    setContent = (key: string, value: unknown): void => {
        this.handlePropertyChange.emit({ key, value });
    };
}
