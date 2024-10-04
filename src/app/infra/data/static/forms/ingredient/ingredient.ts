export const ingredientsFileds = {
    fields: [
        {
            component: 'input',
            name: 'nameIngredient',
            type: 'text',
            label: 'Nome do ingrediente: *',
            id: 'fullName',
            value: '',
            placeholder: 'Digite aqui o nome do ingrediente...',
            validations: [
                {
                    name: 'required',
                    message: 'Nome do ingrediente é obrigatório',
                    value: '',  
                },
            ],
        },
        {
            component: 'select',
            name: 'categorysupplier',
            label: 'Fornecedor: ',
            options: [
              { value: '1', label: 'Gomes da Costa' },
              { value: '2', label: 'Oxan' },
              { value: '3', label: 'Assai' },
              { value: '4', label: 'Atacadão' },
              { value: '5', label: 'Unilever' },
            ],
          },
        {
            component: 'input',
            name: 'description',
            type: 'desc',
            label: 'Descrição: *',
            id: 'description',
            placeholder: 'Faça uma breve descrição do produto...',
            value: '',
            validations: [],
        },
        {
            component: 'input',
            name: 'price',
            type: 'text',
            id: 'price',
            value: '',
            placeholder: 'Digite o valor do produto...',
            label: 'Empresa:',
            validations: [],
        },
        
    ],
};