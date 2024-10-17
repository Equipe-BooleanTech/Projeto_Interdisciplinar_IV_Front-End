export const completeUserInfoFields = {
    fields: [
        {
            component: 'input',
            name: 'fullName',
            type: 'text',
            label: 'Nome completo: *',
            id: 'fullName',
            value: '',
            placeholder: 'Digite seu nome completo...',
            validations: [
                {
                    name: 'required',
                    message: 'Nome completo é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'email',
            type: 'email',
            value: '',
            label: 'Email: *',
            id: 'email',
            placeholder: 'Digite seu e-mail para contato...',
            validations: [
                {
                    name: 'required',
                    message: 'E-mail para contato é obrigatório',
                    value: '',
                },
                {
                    name: 'email',
                    message: 'Email deve ser válido',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'phone',
            type: 'tel',
            label: 'Telefone: *',
            id: 'phone',
            placeholder: 'Digite seu telefone para contato...',
            value: '',
            validations: [
                {
                    name: 'required',
                    message: 'Telefone para contato é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'company',
            type: 'text',
            id: 'company',
            value: '',
            placeholder: 'Digite o nome da sua empresa...',
            label: 'Empresa:',
            validations: [],
        },
        {
            component: 'textarea',
            name: 'message',
            type: 'textarea',
            id: 'message',
            label: 'Mensagem: *',
            placeholder: 'Digite sua mensagem...',
            value: '',
            validations: [
                {
                    name: 'required',
                    message: 'Mensagem é obrigatória',
                    value: '',
                },
            ],
        },
    ],
};
