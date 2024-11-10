
export const fichaFormFields = {
    fields: [
        {
            component: 'input',
            name: 'nome',
            type: 'text',
            label: 'Nome do Item:*',
            value: '',
            placeholder: 'Digite aqui o nome do item...',
            validations: [{ name: 'required', message: 'Campo obrigatório' }],
        },
        {
            component: 'select',
            options: [
                { value: {}, label: 'Selecione uma categoria...'},
            ],             
            name: 'ingredientes',
            type: 'text',
            label: 'Ingredientes:*',
            value: '',
            placeholder: 'Selecione os ingredientes...',
            validations: [{ name: 'required', message: 'Campo obrigatório' }],
        },
        {
            component: 'input',
            name: 'tempo',
            type: 'text',
            label: 'Tempo de Preparo:',
            value: '',
            placeholder: 'Digite aqui o tempo de preparo...',
        },
        {
            component: 'input',
            name: 'custo',
            type: 'text',
            label: 'Custo final:*',
            value: '',
            placeholder: 'Digite aqui o custo final...',
            validations: [{ name: 'required', message: 'Campo obrigatório' }],
        },
        {
            component: 'input',
            name: 'rendimentoPorcao',
            type: 'text',
            label: 'Redimento porção:',
            value: '',
            placeholder: 'Digite aqui o rendimento por porção...',
        },
        {
            component: 'input',
            name: 'rendimentoTotal',
            type: 'text',
            label: 'Redimento total:',
            value: '',
            placeholder: 'Digite aqui o rendimento total em porções...',
        },
    ],
};