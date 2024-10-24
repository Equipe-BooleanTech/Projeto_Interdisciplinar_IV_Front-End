export const loginFields = {
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
