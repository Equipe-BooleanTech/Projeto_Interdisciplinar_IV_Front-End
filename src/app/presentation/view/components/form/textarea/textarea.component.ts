import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './textarea.component.html',
    styles: ``,
})
export class TextareaComponent {
    @Input() field: any;
    @Input() form: FormGroup;
}
