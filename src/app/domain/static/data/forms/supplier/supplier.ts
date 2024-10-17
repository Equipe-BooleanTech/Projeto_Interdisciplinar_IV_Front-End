export const supplierFileds = {
    fields: [
        {
            component: 'input',
            name: 'nameSupplier',
            type: 'text',
            label: 'Nome do Fornecedor: *',
            id: 'fullName',
            value: '',
            placeholder: 'Digite aqui o nome do Fornecedor...',
            validations: [
                {
                    name: 'required',
                    message: 'Nome do Fornecedor é obrigatório',
                    value: '',
                },
            ],
        },
        {
            component: 'input',
            name: 'CNPJ',
            type: 'text',
            label: 'CNPJ: *',
            id: 'CNPJ',
            placeholder: 'Digite aqui o CNPJ do Fornecedor...',
            value: '',
            validations: [
                {
                    name: 'required',
                    message: 'CNPJ do Fornecedor é obrigatório',
                    value: '',
                },
                {
                    name: 'pattern',
                    message: 'Formato de CNPJ inválido',
                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/ // Regex para validar o formato do CNPJ
                }
            ],
                
        },
        {
            component: 'input',
            name: 'contact',
            type: 'text',
            id: 'contact',
            value: '',
            placeholder: 'Digite o nome do contato do Fornecedor...',
            label: 'Nome para contato:',
            validations: [],
        },
        {
            component: 'input',
            name: 'phone',
            type: 'text',
            id: 'phone',
            value: '',
            placeholder: 'Digite o número de telefone do Fornecedor...',
            label: 'Número de telefone:',
            validations: [],
        },
    ],
};
