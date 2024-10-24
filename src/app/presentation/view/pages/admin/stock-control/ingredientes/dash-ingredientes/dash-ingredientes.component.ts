import { Component } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-dash-ingredientes',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './dash-ingredientes.component.html',
    styles: ``,
})
export class DashIngredientesComponent {
    constructor() {}

    tabela: TableConfig<{
        ingrediente: string;
        quantidade: string;
        dataValidade: string;
        individualRecord: string;
    }> = {
        rowOrder: [
            'ingrediente',
            'quantidade',
            'dataValidade',
            'individualRecord',
        ],
        title: 'Ingredientes Cadastrados e Validade',
        filters: [
            { isActive: true, text: 'Disponíveis' },
            { isActive: false, text: 'Indisponíveis' },
        ],
        metrics: 'Total: 8 ingredientes, 6 Disponíveis, 2 Indisponíveis',
        header: ['Ingrediente', 'Quantidade', 'Data de Validade', 'Ações'],
        data: [
            {
                rowData: {
                    ingrediente: 'Tomate',
                    quantidade: '10 kg',
                    dataValidade: '12/10/2024',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'], // Adicionando o tipo do botão
            },
            {
                rowData: {
                    ingrediente: 'Cebola',
                    quantidade: '5 kg',
                    dataValidade: '01/11/2024',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Alho',
                    quantidade: '2 kg',
                    dataValidade: '15/08/2024',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Molho de Tomate Industrializado',
                    quantidade: '3 unidades (500g cada)',
                    dataValidade: '05/12/2024',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Azeite de Oliva',
                    quantidade: '1 litro',
                    dataValidade: '01/02/2025',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Sal Refinado',
                    quantidade: '1 kg',
                    dataValidade: 'Indeterminado',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Farinha de Trigo',
                    quantidade: '2 kg',
                    dataValidade: '15/08/2025',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    ingrediente: 'Feijão Preto',
                    quantidade: '10 kg',
                    dataValidade: '20/11/2025',
                    individualRecord: 'Visualizar última entrada',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
        ],
        search: {
            placeholder: 'Buscar por ingrediente',
            value: '',
            onSearch: (value: string) => {
                console.log(value);
            },
        },
        pagination: {
            pageRange: 10,
            totalItems: 8,
        },
    };
   
}
