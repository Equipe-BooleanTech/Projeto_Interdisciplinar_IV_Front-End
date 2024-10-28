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
import { forgotFields } from '@domain/static/data';
import { ForgotPasswordUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    FooterComponent,
    FormComponent,
} from '@presentation/view/components';
import { FormInputComponent } from '@presentation/view/components/form';

@Component({
    selector: 'app-reset-password',
    templateUrl: './forgot-password.component.html',
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
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    forgotFields = forgotFields;
    constructor(
        private _formBuilder: FormBuilder,
        private _forgotPasswordService: ForgotPasswordUseCase
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
        }, { validator: this._checkPasswords });
    }

    // Validação para garantir que as senhas coincidem
    private _checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword')?.value;
        const confirmPass = group.get('confirmPassword')?.value;
        return pass === confirmPass ? null : { notSame: true };
    }

    submit(): void {
        if (this.form.valid) {
            const newPassword = this.form.get('newPassword')?.value;
            this._forgotPasswordService.resetPassword({ newPassword }).subscribe(
                () => {
                    alert('Senha alterada com sucesso!');
                    window.location.href = '/login';
                },
                () => {
                    alert('Erro ao alterar senha. Tente novamente.');
                }
            );
        }
    }
}
