/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { InputSendLoginFormDto, OutputSendLoginFormDto } from '@domain/dtos';
import { loginFields } from '@domain/static/data';
import { AuthenticateUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    FormComponent,
    FooterComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/security';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        FormComponent,
        FormInputComponent,
        ReactiveFormsModule,
        CommonModule,
        ButtonComponent,
        FooterComponent,
    ],
    standalone: true,
})
export class LoginComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    loginFields = loginFields;
    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthenticateUseCase,
        private _tokenService: TokenService,
        private toastr: ToastrService
    ) {}
    ngOnInit(): void {
        this.form = this._formBuilder.group({});
        this.loginFields.fields.forEach((field) => {
            const control = this._formBuilder.control(
                field.value || '',
                this._bindValidations(field.validations || []),
            );
            this.form.addControl(field.name, control);
        });
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

    submit(data: InputSendLoginFormDto): void {
        this._authService.sendCredentials(data).subscribe((response) => {
            const output: OutputSendLoginFormDto = {
                statusCode: response.statusCode,
                token: response.token,
            };
            if (output.token) {
                this._tokenService.setToken(output.token);
            }
            this.handleResponse(output);
        });
    }

    handleResponse(output: OutputSendLoginFormDto): void {
        if (output.statusCode === 200) {
            document.cookie = `token=${output.token}; expires=${new Date().getDate() + 1}`;
            this.toastr.success("Login efetuado com sucesso! Redirecionando...", "Sucesso")
            setTimeout(() => {
                window.location.href = '/admin';
            }, 3000)
        } else {
            this.toastr.error("Credenciais inválidas! Tente novamente...", "Oops...")
        }
    }
}
