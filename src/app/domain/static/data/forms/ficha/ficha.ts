
export const fichaFormFields = {
    fields: [
        {
            component: 'input',
            name: 'name',
            type: 'text',
            label: 'Nome da Ficha Técnica: *',
            value: '',
            placeholder: 'Digite aqui o nome da ficha...',
            validations: [{ name: 'required', message: 'Campo obrigatório' }],
        },
        {
            component: 'select',
            options: [
                { value: {}, label: 'Selecione os ingredientes desejados...' },
            ],
            name: 'ingredients',
            type: 'text',
            label: 'Selecione os ingredientes desejados: *',
            value: '',
            placeholder: 'Selecione os ingredientes...',
            validations: [{ name: 'required', message: 'Campo obrigatório' }],
        },
    ],
};