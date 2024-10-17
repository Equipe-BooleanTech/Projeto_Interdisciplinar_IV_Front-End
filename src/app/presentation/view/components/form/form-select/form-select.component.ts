/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CommonModule, NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-form-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NgClass],
    templateUrl: './form-select.component.html',
    styles: ``,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectComponent),
            multi: true,
        },
    ],
})
export class FormSelectComponent implements ControlValueAccessor {
    @Input() class: string = '';
    @Input() formControlName: string = '';
    @Input() options: { value: string; label: string }[] = [];
    value: string = '';

    onChange: any = () => {};
    onTouched: any = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onSelectChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.value = select.value;
        this.onChange(this.value);
        this.onTouched();
    }

    getClassList(): string {
        const defaultClasses =
            'form-select mt-1 outline-[#740318] border-2 border-[#740318] rounded-md shadow-sm focus:border-[#740318] focus:ring-[#740318] focus:ring-opacity-50';
        return `${defaultClasses} ${this.class}`;
    }
}
