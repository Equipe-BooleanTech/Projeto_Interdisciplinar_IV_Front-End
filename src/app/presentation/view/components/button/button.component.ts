import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [NgClass],
    templateUrl: './button.component.html',
    styles: ``,
})
export class ButtonComponent {
    @Input() link: string | undefined = '';
    @Input() class: string = '';
    @Input() disabled: boolean = false;

    @Output() handlePropertyChange = new EventEmitter<{
        key: string;
        value: unknown;
    }>();

    setContent = (key: string, value: unknown): void => {
        this.handlePropertyChange.emit({ key, value });
    };
}
