export const groupFormFields = {
    fields: [
        {
            component: 'input',
            name: 'title',
            type: 'text',
            label: 'Título: *',
            id: 'title',
            value: '',
            placeholder: 'Digite o título do Grupo de Fichas...',
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
            name: 'datasheets',
            label: 'Fichas Técnicas associadas: *',
            id: 'datasheets',
            value: [],
            placeholder:
                'Selecione as fichas técnicas que esse grupo irá armazenar...',
            options: [
                {
                    value: '',
                    label: 'Selecione as fichas técnicas que esse grupo irá armazenar...',
                },
            ],
            validations: [
                {
                    name: 'required',
                    message: 'Fichas Técnicas é obrigatório',
                    value: '',
                },
            ],
        },
    ],
};
