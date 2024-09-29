import { FormFieldDto } from '@domain/dtos';

export interface FormConfig {
    fields: FormFieldDto[];
    submitButtonLabel?: string;
}