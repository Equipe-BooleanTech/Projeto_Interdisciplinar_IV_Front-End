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
import { catchError, of } from 'rxjs';

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
        this._prospectionService
            .sendForm(data)
            .pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse) {
                        alert(`Ocorreu um erro: ${err.message}`);
                    } else if (err instanceof Error) {
                        alert(`Ocorreu um erro: ${err.message}`);
                    } else {
                        alert('Ocorreu um erro desconhecido.');
                    }
                    return of();
                }),
            )
            .subscribe((response) => {
                const output: OutputSendProspectionFormDto = {
                    statusCode: response.statusCode,
                    message: response.message,
                };
                this.handleResponse(output);
                if (output.statusCode === 201) {
                    alert(
                        'Formulário criado com sucesso! Entraremos em contato em até 3 dias úteis!',
                    );
                    window.location.reload();
                }
            });
    }

    handleResponse(output: OutputSendProspectionFormDto): void {
        console.log(output);
    }
}
