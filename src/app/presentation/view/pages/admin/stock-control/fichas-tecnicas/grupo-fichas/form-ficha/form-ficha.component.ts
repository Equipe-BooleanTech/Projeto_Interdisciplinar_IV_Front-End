import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { IngredientDto, PaginatedResponse, DefaultResponseDto, DataSheetDto } from '@domain/dtos';
import { fichaFormFields } from '@domain/static/data';
import { FormValidateService } from '@domain/static/services';
import { IngredientsUseCase, DataSheetUseCase } from '@domain/usecases';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-form-ficha',
    standalone: true,
    imports: [
        SidebarComponent,
        FormComponent,
        ReactiveFormsModule,
        CommonModule,
        FormInputComponent,
        ButtonComponent,
    ],
    templateUrl: './form-ficha.component.html',
    styles: ``,
})
export class FormFichaComponent implements OnInit {
    fichaForm: FormGroup = new FormGroup({});
    fichaFields = fichaFormFields;
    method: 'POST' | 'PUT' = 'POST';

    constructor(
        private _formBuilder: FormBuilder,
        private _formValidateService: FormValidateService,
        private ingredientUseCase: IngredientsUseCase,
        private datasheetUseCase: DataSheetUseCase,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.fichaForm = this._formBuilder.group(
            this.fichaFields.fields.reduce(
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

        this.loadIngredients();
    }

    private loadIngredients(): void {
        this.ingredientUseCase
            .getIngredients(0, 100)
            .pipe(
                map((response: PaginatedResponse<IngredientDto>) =>
                    response.content.map((ingredient) => ({
                        value: ingredient.name,
                        label: ingredient.name + ' ' + ingredient.description,
                    })),
                ),
            )
            .subscribe((ingredientOptions) => {
                const ingredientField = this.fichaFields.fields.find(
                    (field) => field.name === 'ingredients',
                );
                if (ingredientField) {
                    ingredientField.options = ingredientOptions;
                }
            });
    }

    submit(): void {
        if (this.fichaForm.valid) {
            const formattedResponse = {
                ...this.fichaForm.value,
                ingredients: this.fichaForm.value.ingredients.map(
                    (name: string) => ({
                        name: name,
                    }),
                ),
            };
            this.datasheetUseCase
                .registerDataSheet(formattedResponse)
                .subscribe({
                    next: (response: DataSheetDto) => {
                        this.toastr.success("Ficha técnica cadastrada com sucesso!", "Sucesso")
                    },
                    error: (error: DefaultResponseDto) => {
                        this.toastr.error("Ocorreu um erro ao cadastrar a ficha técnica. Verifique os ingredientes e tente novamente!", "Oops..")
                    },
                });
        } 
    }
}