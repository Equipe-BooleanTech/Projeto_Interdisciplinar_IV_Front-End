/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@angular/core';
import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormValidateService {
    constructor() {}

    bindValidations(
        validations: {
            name: string;
            message: string;
            value: string | number | RegExp;
        }[],
    ): ValidatorFn | null {
        if (validations.length > 0) {
            const validList = validations.map(this.getValidator);
            return Validators.compose(validList);
        }
        return null;
    }

    getValidator(validation: {
        value: number | string | RegExp;
        name: string;
        message: string;
    }): ValidatorFn {
        switch (validation.name) {
            case 'required':
                return (control: AbstractControl): ValidationErrors | null => {
                    return control.value ? null : { required: validation.message };
                };
            case 'min':
                return (control: AbstractControl): ValidationErrors | null => {
                    return control.value && control.value >= validation.value
                        ? null
                        : { min: validation.message };
                };
            case 'max':
                return (control: AbstractControl): ValidationErrors | null => {
                    return control.value && control.value <= validation.value
                        ? null
                        : { max: validation.message };
                };
            case 'email':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.email(control)
                        ? null
                        : { email: validation.message };
                };
            case 'pattern':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.pattern(validation.value as RegExp | string)(control)
                        ? null
                        : { pattern: validation.message };
                };
            default:
                return (control: AbstractControl): ValidationErrors | null =>
                    null;
        }
    }
}
