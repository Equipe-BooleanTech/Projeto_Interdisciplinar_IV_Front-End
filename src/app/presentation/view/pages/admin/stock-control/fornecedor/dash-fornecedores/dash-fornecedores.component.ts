import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-dash-fornecedores',
    standalone: true,
    imports: [
        SidebarComponent,
        TableComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './dash-fornecedores.component.html',
    styles: ``,
})
export class DashFornecedoresComponent {
    constructor() {}

    tabela: TableConfig<{
        supplier: string;
        individualRecord: string;
        lastUpdate: string;
    }> = {
        rowOrder: ['supplier', 'individualRecord', 'lastUpdate'],
        title: 'Fornecedores Cadastrados e Atualizações',
        filters: [
            { isActive: true, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: 'Total: 10 fornecedores, 8 Ativos, 2 Inativos',
        header: ['Fornecedor', 'Cadastro', 'Última Atualização'],
        data: [
            {
                rowData: {
                    supplier: 'Sabores do Campo',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '23/09/2016',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Sabor e Arte Gourmet',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '21/04/2012',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Naturalmente Fresco',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '14/12/2017',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Delicias do Chef',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '18/07/2017',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Rota dos Sabores',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '31/01/2014',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Mesa Cheia',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '10/12/2013',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Sabor das Estações',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '27/05/2015',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    supplier: 'Bons Pratos',
                    individualRecord: 'Visualizar cadastro',
                    lastUpdate: '07/05/2016',
                },
                componentType: ['text', 'button', 'text'],
            },
        ],

        search: {
            placeholder: 'Buscar por fornecedor',
            value: '',
            onSearch: (value: string) => {
                console.log(value);
            },
        },
        pagination: {
            pageRange: 10,
            totalItems: 10,
        },
    };
    
}
