/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Validation } from '@domain/base';
import { FormConfig } from '@domain/static/interfaces';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form.component.html',
    styles: ``,
})
export class FormComponent implements OnInit {
    @Input() config: FormConfig = { fields: [] };
    @Input() class: string = '';
    @Input() formGroup!: FormGroup;
    @Input() formControlName: string | undefined;
    @Output() onSubmit = new EventEmitter<void>();
    @Output() submitForm = new EventEmitter<any>();

    form: FormGroup = this._formBuilder.group({});

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this._createFormGroup();
    }

    private _createFormGroup(): FormGroup {
        const group = this._formBuilder.group({});
        this.config.fields.forEach((field) => {
            const control = this._formBuilder.control(
                field.value || '',
                this._bindValidations(field.validations || []),
            );
            group.addControl(field.name, control);
        });
        return group;
    }

    private _bindValidations(validations: Validation[]): any {
        if (validations.length > 0) {
            const validList = validations
                .map((valid) => this._getValidator(valid))
                .filter((v) => v !== null);
            return Validators.compose(validList);
        }
        return null;
    }

    private _getValidator(this: void, validation: Validation): any {
        switch (validation.name) {
            case 'required':
                return Validators.required;
            case 'min':
                return Validators.min(validation.value);
            case 'max':
                return Validators.max(validation.value);
            case 'email':
                return Validators.email;
            case 'pattern':
                return Validators.pattern(validation.value);
            default:
                return null;
        }
    }
    submit(): void {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
        }
    }
}
