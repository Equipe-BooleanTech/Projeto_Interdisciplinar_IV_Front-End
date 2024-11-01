export const forgotFields = {
    fields: [
        {
            component: 'input',
            name: 'email',
            type: 'email',
            label: 'Email',
            value: '',
            placeholder: 'Digite a nova senha',
            validations: [
            ],
        },
        {
            component: 'input',
            name: 'currentPassword',
            type: 'password',
            label: 'Senha',
            value: '',
            placeholder: 'Digite a sua antiga senha',
            validations: [
            ],
        },
        {
            component: 'input',
            name: 'newPassword',
            type: 'password',
            value: '',
            label: 'Nova Senha: ',
            placeholder: 'Confirme a nova senha',
            validations: [
                
            ],
        },
    ],
};
