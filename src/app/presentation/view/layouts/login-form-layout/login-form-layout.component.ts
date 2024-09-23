import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSendLoginFormDto } from '@domain/usecases/shared/authenticate/InputSendLoginFormDto/InputSendLoginFormDto';
import { OutputSendLoginFormDto } from '@domain/usecases/shared/authenticate/OutputSendLoginFormDto/OutputSendLoginFormDto';
import { AuthRepository } from '@infra/repository/auth/auth.repository';
import { ButtonComponent, FormComponent } from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';
import { FormLayoutComponent } from "../homepage-layout/form-layout/form-layout.component";

@Component({
  selector: 'app-login-form-layout',
  standalone: true,
  imports: [FormComponent, FormInputComponent, FormLayoutComponent, ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './login-form-layout.component.html',
  styles: ``


})
export class LoginFormLayoutComponent {
form: FormGroup = new FormGroup({});

constructor( private _formBuilder: FormBuilder, private _authRepository: AuthRepository) {}
  config = {
    fields: [
        {
            component: 'input',
            name: 'email',
            type: 'email',
            label: 'Email',
            value: '',
            placeholder: 'Digite seu email',
            validations: [
                {
                    name: 'required',
                    message: 'Email é obrigatório',
                },
            ],
        },
        {
            component: 'input',
            name: 'password',
            type: 'password',
            value: '',
            label: 'Senha: *',
            placeholder: 'Digite sua senha',
            validations: [
                {
                    name: 'required',
                    message: 'Senha obrigatória',
                },
            ],
        },

    ],
  };
  ngOnInit(): void {
    this.form = this._formBuilder.group({});
    this.config.fields.forEach((field) => {
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
    this._authRepository.sendCredentials(data).subscribe((response) => {
        const output: OutputSendLoginFormDto = {
            statusCode: response.statusCode,
            message: response.message,
        };
        this.handleResponse(output);
    });
}

handleResponse(output: OutputSendLoginFormDto): void {
    console.log(output);
}



}
