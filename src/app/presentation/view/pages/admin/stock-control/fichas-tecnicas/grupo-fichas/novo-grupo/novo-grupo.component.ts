import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateService } from '@domain/static/services';
import { DataSheetGroupUseCase, DataSheetUseCase } from '@domain/usecases';
import { ToastrService } from 'ngx-toastr';
import {
    SidebarComponent,
    FormComponent,
    ButtonComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { groupFormFields } from '@domain/static/data/forms/group/group';
import { DefaultResponseDto, DataSheetGroupDto } from '@domain/dtos';

@Component({
    selector: 'app-novo-grupo',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
        ButtonComponent,
    ],
    templateUrl: './novo-grupo.component.html',
    styles: ``,
})
export class NovoGrupoComponent implements OnInit {
    fichaGroupForm: FormGroup = new FormGroup({});
    groupFields = groupFormFields;
    method: 'POST' | 'PUT' = 'POST';

    constructor(
        private _formBuilder: FormBuilder,
        private _formValidateService: FormValidateService,
        private _dataSheetGroupUseCase: DataSheetGroupUseCase,
        private _dataSheetUseCase: DataSheetUseCase,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.fichaGroupForm = this._formBuilder.group(
            this.groupFields.fields.reduce(
                (formFields: { [key: string]: any[] }, field) => {
                    formFields[field.name] = [
                        field.value || '',
                        this._formValidateService.bindValidations(
                            field.validations?.map((validation) => ({
                                ...validation,
                                value: validation.name || '',
                            })) || [],
                        ),
                    ];
                    return formFields;
                },
                {} as { [key: string]: [string, ValidatorFn | null] },
            ),
        );

        this._loadDataSheets();
    }

    private _loadDataSheets(): void {
        this._dataSheetUseCase.getDatasheets(0, 100).subscribe((response) => {
            const dataSheetOptions = response.content.map((datasheet) => ({
                value: datasheet.name,
                label: datasheet.name,
            }));
            const dataSheetField = this.groupFields.fields.find(
                (field) => field.name === 'datasheets',
            );
            if (dataSheetField) {
                dataSheetField.options = dataSheetOptions;
            }
        });
    }

    submit(): void {
        if (this.fichaGroupForm.valid) {
            const formattedResponse = {
                ...this.fichaGroupForm.value,
                datasheets: this.fichaGroupForm.value.datasheets.map(
                    (name: string) => ({
                        name: name,
                    }),
                ),
            };
            this._dataSheetGroupUseCase
                .registerDataSheetGroup(formattedResponse)
                .subscribe({
                    next: (response) => {
                        this.toastr.success(
                            'Grupo de fichas técnicas cadastrado com sucesso!',
                            'Sucesso',
                        );
                    },
                    error: (error: DefaultResponseDto) => {
                        this.toastr.error(
                            'Ocorreu um erro ao cadastrar o grupo de fichas técnicas. Tente novamente!',
                            'Oops..',
                        );
                    },
                });
        }
    }
}
