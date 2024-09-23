/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Homepage } from '@domain/interfaces';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/usecases/prospection';
import { ProspectionRepository } from '@infra/repository';
import { DataTransferService } from '@infra/services';
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
    config = {
        fields: [
            {
                component: 'input',
                name: 'fullName',
                type: 'text',
                label: 'Nome completo: *',
                value: '',
                placeholder: 'Digite seu nome completo...',
                validations: [
                    {
                        name: 'required',
                        message: 'Nome completo é obrigatório',
                    },
                ],
            },
            {
                component: 'input',
                name: 'email',
                type: 'email',
                value: '',
                label: 'Email: *',
                placeholder: 'Digite seu e-mail para contato...',
                validations: [
                    {
                        name: 'required',
                        message: 'E-mail para contato é obrigatório',
                    },
                    { name: 'email', message: 'Email deve ser válido' },
                ],
            },
            {
                component: 'input',

                name: 'phone',
                type: 'tel',
                label: 'Telefone: *',
                placeholder: 'Digite seu telefone para contato...',
                value: '',
                validations: [
                    {
                        name: 'required',
                        message: 'Telefone para contato é obrigatório',
                    },
                ],
            },
            {
                component: 'input',
                name: 'company',
                type: 'text',
                value: '',
                placeholder: 'Digite o nome da sua empresa...',
                label: 'Empresa:',
                validations: [],
            },
            {
                component: 'textarea',
                name: 'message',
                type: 'textarea',
                label: 'Mensagem: *',
                placeholder: 'Digite sua mensagem...',
                value: '',
                validations: [
                    {
                        name: 'required',
                        message: 'Mensagem é obrigatória',
                    },
                ],
            },
        ],
    };

    constructor(
        private _prospectionRepository: ProspectionRepository,
        private _formBuilder: FormBuilder,
        private _dataTransferService: DataTransferService,
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({});
        this.config.fields.forEach((field) => {
            const control = this._formBuilder.control(
                field.value || '',
                this._bindValidations(field.validations || []),
            );
            this.form.addControl(field.name, control);
        });
        this._dataTransferService.currentData.subscribe(
            (receivedData: Homepage) => {
                this.homepageData = receivedData;
            },
        );
    }

    private _bindValidations(validations: any[]): any {
        if (validations.length > 0) {
            const validList = validations
                .map((valid) => this._getValidator(valid))
                .filter((v) => v !== null);
            return Validators.compose(validList);
        }
        return null;
    }

    private _getValidator(validation: any): any {
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

    submit(data: InputSendProspectionFormDto): void {
        this._prospectionRepository.sendForm(data).subscribe((response) => {
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
