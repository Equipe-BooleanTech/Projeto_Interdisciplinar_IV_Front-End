/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-form-textarea',
    standalone: true,
    imports: [NgClass],
    templateUrl: './form-textarea.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FormTextareaComponent,
            multi: true,
        },
    ],
})
export class FormTextareaComponent implements ControlValueAccessor {
    @Input() placeholder: string = '';
    value: string = '';
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
        const textarea = event.target as HTMLTextAreaElement;
        this.value = textarea.value;
        this.onChange(this.value);
        this.onTouched();
    }

    getClassList(): string {
        const defaultClasses =
            'form-textarea mt-1 outline-[#740318] border-2 border-[#740318] rounded-md shadow-sm focus:border-[#740318] focus:ring-[#740318] focus:ring-opacity-50';
        return `${defaultClasses} ${this.class}`;
    }
}
