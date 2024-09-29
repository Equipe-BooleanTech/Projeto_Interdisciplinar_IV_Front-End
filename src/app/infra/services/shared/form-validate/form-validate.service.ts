/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@angular/core';
import {
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
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
                    return Validators.required(control)
                        ? { required: validation.message }
                        : null;
                };
            case 'min':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.min(validation.value as number)(control)
                        ? { min: validation.message }
                        : null;
                };
            case 'max':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.max(validation.value as number)(control)
                        ? { max: validation.message }
                        : null;
                };
            case 'email':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.email(control)
                        ? { email: validation.message }
                        : null;
                };
            case 'pattern':
                return (control: AbstractControl): ValidationErrors | null => {
                    return Validators.pattern(
                        validation.value as RegExp | string,
                    )(control)
                        ? { pattern: validation.message }
                        : null;
                };
            default:
                return (control: AbstractControl): ValidationErrors | null =>
                    null;
        }
    }
}
