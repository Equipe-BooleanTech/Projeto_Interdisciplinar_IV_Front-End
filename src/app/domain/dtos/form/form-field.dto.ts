import { Validation } from '@domain/base';

export interface FormFieldDto {
    name: string;
    label: string;
    type: string;
    value?: any;
    options?: { label: string; value: any }[];
    validations?: Validation[];
}
