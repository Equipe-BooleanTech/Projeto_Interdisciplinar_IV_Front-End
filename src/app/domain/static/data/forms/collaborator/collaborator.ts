export const collaboratorFields = {
    fields: [
        {
            component: 'input',
            name: 'name',
            type: 'text',
            label: 'Nome do Colaborador: *',
            id: 'fullName',
            value: '',
            placeholder: 'Digite aqui o nome do Colaborador...',
            validations: [
                {
                    name: 'required',
                    message: 'Nome do Colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'CPF',
            type: 'text',
            label: 'CPF: *',
            id: 'CPF',
            placeholder: 'Digite aqui o CPF do Colaborador...',
            value: '',
            validations: [
                {
                    name: 'required',
                    message: 'CPF do Colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'email',
            type: 'text',
            id: 'email',
            value: '',
            placeholder: 'Digite o email institucional...',
            label: 'Email institucional:',
            validations: [],
        },
        {
            component: 'input',
            name: 'phone',
            type: 'text',
            id: 'phone',
            value: '',
            placeholder: 'Digite o número de telefone do colaborador...',
            label: 'Telefone:',
            validations: [],
        },
    ],
};
