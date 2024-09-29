/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { Homepage } from '@domain/interfaces';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/usecases/prospection';
import { prospectionFields } from '@infra/data/static';
import {
    DataTransferService,
    FormValidateService,
    ProspectionService,
} from '@infra/services';
import { ButtonComponent } from '@presentation/view/components';
import {
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormComponent,
} from '@presentation/view/components/form';

@Component({
    selector: 'app-form-layout',
    standalone: true,
    imports: [
        FormInputComponent,
        FormSelectComponent,
        FormTextareaComponent,
        FormComponent,
        ButtonComponent,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './form-layout.component.html',
    styles: ``,
})
export class FormLayoutComponent implements OnInit {
    homepageData: Homepage | null = null;
    form: FormGroup = new FormGroup({});
    config = prospectionFields;

    constructor(
        private _prospectionService: ProspectionService,
        private _formBuilder: FormBuilder,
        private _dataTransferService: DataTransferService,
        private _formValidateService: FormValidateService,
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group(
            this.config.fields.reduce(
                (formFields, field) => {
                    formFields[field.name] = [
                        field.value || '',
                        this._formValidateService.bindValidations(
                            field.validations || [],
                        ),
                    ];
                    return formFields;
                },
                {} as { [key: string]: [string, ValidatorFn | null] },
            ),
        );

        this._dataTransferService.currentData.subscribe(
            (receivedData: Homepage | null) => {
                this.homepageData = receivedData;
            },
        );
    }

    submit(data: InputSendProspectionFormDto): void {
        this._prospectionService.sendForm(data).subscribe((response) => {
            const output: OutputSendProspectionFormDto = {
                statusCode: response.statusCode,
                message: response.message,
            };
            this.handleResponse(output);
        });
    }

    handleResponse(output: OutputSendProspectionFormDto): void {
        console.log(output);
    }
}
