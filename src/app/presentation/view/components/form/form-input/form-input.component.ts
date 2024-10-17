/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
    imports: [NgClass],
})
export class FormInputComponent implements ControlValueAccessor {
    @Input() type?: string = 'text';
    @Input() placeholder?: string = '';
    @Input() id!: string;
    @Input() control!: FormControl;
    @Input() value: string = '';
    @Input() class: string = '';

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

    getClassList(): string {
        const defaultClasses =
            'form-input mt-1 outline-[#740318] border-2 border-[#740318] rounded-md shadow-sm focus:border-[#740318] focus:ring-[#740318] focus:ring-opacity-50';
        return `${defaultClasses} ${this.class}`;
    }
}
