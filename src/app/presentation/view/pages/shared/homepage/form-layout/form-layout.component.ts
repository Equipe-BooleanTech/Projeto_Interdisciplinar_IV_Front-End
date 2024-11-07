import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/dtos';
import { prospectionFields } from '@domain/static/data';
import { Homepage } from '@domain/static/interfaces';
import {
    DataTransferService,
    FormValidateService,
} from '@domain/static/services';
import { SendProspectionFormUseCase } from '@domain/usecases/prospection';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '@presentation/view/components';
import {
    FormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
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
        private _prospectionService: SendProspectionFormUseCase,
        private _formBuilder: FormBuilder,
        private _dataTransferService: DataTransferService,
        private _formValidateService: FormValidateService,
        private toastr: ToastrService
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
                     this.toastr.success("Agradecemos pelo seu interesse. Entraremos em contato em breve!", "Sucesso!")  

                    setTimeout(() => {
                        window.location.reload();

                    }, 3000)
                }
            });
    }

    handleResponse(output: OutputSendProspectionFormDto): void {
        console.log(output);
    }
}
