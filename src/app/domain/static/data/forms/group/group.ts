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
            name: 'categorygroup',
            id: 'categorygroup',
            label: 'Tipo de Grupo: ',
            value: '', 
            options: [
                { value: '1', label: 'Proteina' },
                { value: '2', label: 'Verdura' },
                { value: '3', label: 'Legumes' },
                { value: '3', label: 'Frutas' },
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
    ],
};