export const collaboratorFields = {
    fields: [
        {
            component: 'input',
            name: 'fullName',
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
            name: 'email',
            type: 'text',
            id: 'email',
            value: '',
            placeholder: 'Digite o email institucional...',
            label: 'Email institucional: *',
            validations: [
                {
                    name: 'required',
                    message: 'Email institucional é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'phone',
            type: 'text',
            id: 'phone',
            value: '',
            placeholder: 'Digite o número de telefone do colaborador...',
            label: 'Telefone: *',
            validations: [
                {
                    name: 'required',
                    message: 'Telefone do Colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'cpf',
            type: 'text',
            label: 'CPF: *',
            id: 'CPF',
            placeholder: 'Digite aqui o CPF do colaborador...',
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
            component: 'select',
            name: 'role',
            type: 'select',
            id: 'role',
            value: '',
            label: 'Cargo: *',
            options: [
                {
                    value: '',
                    label: 'Selecione o cargo desejado...',
                },
                {
                    value: 'ROLE_ADMIN',
                    label: 'Gerente',
                },
                {
                    value: 'ROLE_CHEF',
                    label: 'Chefe de Cozinha',
                },
                {
                    value: 'ROLE_USER',
                    label: 'Garçom',
                },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'Cargo do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'cep',
            type: 'text',
            id: 'cep',
            value: '',
            placeholder: 'Digite o CEP do colaborador...',
            label: 'CEP:',
            validations: [
                {
                    name: 'required',
                    message: 'CEP do Colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'address',
            type: 'text',
            id: 'address',
            value: '',
            placeholder: 'Digite o endereço do colaborador...',
            label: 'Endereço:',
            validations: [
                {
                    name: 'required',
                    message: 'Endereço do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'addressNumber',
            type: 'text',
            id: 'addressNumber',
            value: '',
            placeholder: 'Digite o número do endereço do colaborador...',
            label: 'Número: *',
            validations: [
                {
                    name: 'required',
                    message: 'Número do endereço do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'city',
            type: 'text',
            id: 'city',
            value: '',
            placeholder: 'Digite a cidade do colaborador...',
            label: 'Cidade: *',
            validations: [
                {
                    name: 'required',
                    message: 'Cidade do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'state',
            type: 'text',
            id: 'state',
            value: '',
            placeholder: 'Digite o Estado do colaborador...',
            label: 'Estado: *',
            validations: [
                {
                    name: 'required',
                    message: 'Estado do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'neighborhood',
            type: 'text',
            id: 'neighborhood',
            value: '',
            placeholder: 'Digite o bairro',
            label: 'Bairro: *',
            validations: [
                {
                    name: 'required',
                    message: 'Bairro do colaborador é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'cnpj',
            type: 'text',
            id: 'cnpj',
            value: '',
            placeholder: 'Digite o CNPJ, se aplicável...',
            label: 'CNPJ:',
            validations: [],
        },
    ],
};
