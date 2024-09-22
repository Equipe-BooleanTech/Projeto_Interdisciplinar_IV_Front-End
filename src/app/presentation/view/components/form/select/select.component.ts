import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './select.component.html',
    styles: ``,
})
export class SelectComponent {
    @Input() field: any;
    @Input() form: FormGroup;
}
