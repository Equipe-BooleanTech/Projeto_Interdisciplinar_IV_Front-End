import { FormFieldDto } from "@domain/static/dtos";

export interface FormConfig {
    fields: FormFieldDto[];
    submitButtonLabel?: string;
}