export const financeFields = {
    fields: [
        {
            component: 'input',
            name: 'title',
            type: 'text',
            label: 'Título: *',
            id: 'title',
            value: '',
            placeholder: 'Digite o título da finança...',
            validations: [
                {
                    name: 'required',
                    message: 'Título da finança é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'select',
            name: 'categorysupplier',
            id: 'categorysupplier',
            label: 'Fornecedor: ',
            value: '', 
            options: [
                { value: '1', label: 'Gomes da Costa' },
                { value: '2', label: 'Oxan' },
                { value: '3', label: 'Assai' },
                { value: '4', label: 'Atacadão' },
                { value: '5', label: 'Unilever' },
            ],
        },
        {
            component: 'textarea',
            name: 'description',
            label: 'Descrição:',
            id: 'description',
            value: '',
            placeholder: 'Digite uma breve descrição...',
            validations: [],
        },
        {
            component: 'input',
            name: 'value',
            type: 'number',
            label: 'Valor: *',
            id: 'value',
            value: '',
            placeholder: 'Digite o valor da finança...',
            validations: [
                {
                    name: 'required',
                    message: 'Valor é obrigatório',
                    value: '',
                },
            ],
        },
    ],
};
