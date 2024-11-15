export const expenseFields = {
    fields: [
        {
            component: 'input',
            name: 'amount',
            type: 'text',
            label: 'Valor da despesa: *',
            id: 'amount',
            value: '',
            placeholder: 'Digite o valor da despesa...',
            validations: [
                {
                    name: 'required',
                    message: 'O valor da despesa é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'description',
            type: 'text',
            label: 'Descrição:',
            id: 'amount',
            value: '',
            placeholder: 'Digite uma descrição para a despesa...',
        },
        {
            component: 'select',
            name: 'category',
            type: 'text',
            label: 'Categoria: *',
            id: 'category',
            placeholder: 'Selecione a categoria da despesa...',
            value: '',
            options: [
                {
                    label: 'Ingredientes',
                    value: 'INGREDIENTS',
                },
                {
                    label: 'Salário',
                    value: 'SALARIES',
                },
                {
                    label: 'Manutenções',
                    value: 'MAINTENANCE',
                },
                {
                    label: 'Conta de Água',
                    value: 'WATER_BILL',
                },
                {
                    label: 'Conta de Luz',
                    value: 'ELECTRICITY_BILL',
                },
                {
                    label: 'Outros',
                    value: 'OTHERS',
                },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'A categoria da despesa é obrigatória',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'paymentDate',
            type: 'date',
            label: 'Data de pagamento: *',
            id: 'paymentDate',
            value: '',
            placeholder: 'Escolha uma data de pagamento...',
            validations: [
                {
                    name: 'required',
                    message: 'Selecione uma data válida.',
                    value: '',
                },
            ],
        },
    ],
};
