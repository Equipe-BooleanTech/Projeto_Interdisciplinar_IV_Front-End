export const financeGroup = {
    fields: [
        {
            component: 'input',
            name: 'name',
            type: 'text',
            label: 'Título: *',
            id: 'title',
            value: '',
            placeholder: 'Digite o título do grupo de finanças...',
            validations: [
                {
                    name: 'required',
                    message: 'Título é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'select',
            name: 'revenues',
            type: 'select',
            label: 'Selecione as receitas desejadas *:',
            value: '',
            options: [
                {
                    value: '',
                    label: 'Selecione...',
                },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'Selecione ao menos uma receita para continuar.',
                    value: '',
                },
            ],
        },
        {
            component: 'select',
            name: 'expenses',
            label: 'Selecione as despesas desejadas *:',
            type: 'select',
            value: '',
            options: [
                {
                    value: '',
                    label: 'Selecione...',
                },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'Selecione ao menos uma despesa para continuar.',
                    value: '',
                },
            ],
        },
    ],
};
