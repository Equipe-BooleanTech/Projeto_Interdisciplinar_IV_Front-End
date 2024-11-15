export const revenueFields = {
    fields: [
        {
            component: 'input',
            name: 'amount',
            type: 'text',
            label: 'Valor da receita: *',
            id: 'amount',
            value: '',
            placeholder: 'Digite o valor da receita...',
            validations: [
                {
                    name: 'required',
                    message: 'O valor da receita é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'saleDate',
            type: 'date',
            label: 'Data de entrada no caixa: *',
            id: 'saleDate',
            value: '',
            placeholder: 'Escolha uma data de entrada no caixa...',
            validations: [
                {
                    name: 'required',
                    message: 'Selecione uma data válida.',
                    value: '',
                },
            ],
        },
        {
            component: 'select',
            name: 'paymentMethod',
            label: 'Método de pagamento: *',
            id: 'paymentMethod',
            value: '',
            options: [
                {
                    value: 'CASH',
                    label: 'Dinheiro',
                },
                {
                    value: 'CREDIT_CARD',
                    label: 'Cartão de Crédito',
                },
                {
                    value: 'PIX',
                    label: 'Pix',
                },
                {
                    value: 'OTHER',
                    label: 'Outro',
                },
            ],

            validations: [
                {
                    name: 'required',
                    message: 'Método de pagamento é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'category',
            type: 'text',
            label: 'Categoria: *',
            id: 'category',
            value: '',
            placeholder: 'Digite a categoria da receita...',
            validations: [
                {
                    name: 'required',
                    message: 'A categoria da receita é obrigatória',
                    value: '',
                },
            ],
        },
        {
            component: 'select',
            name: 'employee',
            type: 'text',
            label: 'Colaborador responsável: *',
            id: 'employee',
            value: '',
            options: [
                { label: 'Selecione o colaborador responsável...', value: '' },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'Colaborador responsável é obrigatório',
                    value: '',
                },
            ],
        },
    ],
};
