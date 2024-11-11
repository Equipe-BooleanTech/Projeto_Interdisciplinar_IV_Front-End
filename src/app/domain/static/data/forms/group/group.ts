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
            component: 'textarea',
            name: 'description',
            label: 'Descrição:',
            id: 'description',
            value: '',
            placeholder: 'Digite uma breve descrição sobre esse grupo de fichas (quais fichas ele será responsável por armazenar, etc.)...',
            validations: [],
        },
    ],
};