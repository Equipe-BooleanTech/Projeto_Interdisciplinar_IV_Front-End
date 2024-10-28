import { Validation } from '@domain/base';

export interface FormFieldDto {
    name: string;
    label: string;
    type: string;
    value?: any;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: any }[] | { value: string; label: string }[];
    validations?: Validation[];
}
