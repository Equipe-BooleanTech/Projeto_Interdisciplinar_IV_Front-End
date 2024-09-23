/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-form-input',
    standalone: true,
    templateUrl: './form-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true,
        },
    ],
})
export class FormInputComponent implements ControlValueAccessor {
    @Input() type: string = '';
    @Input() placeholder: string = '';
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

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
        this.onTouched();
    }
}
