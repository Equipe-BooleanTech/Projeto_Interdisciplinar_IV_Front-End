import { Component } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-grupo-fichas',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './grupo-fichas.component.html',
    styles: ``,
})
export class GrupoFichasComponent {
    constructor() {}

    tabela: TableConfig<{
        prato: string;
        fichaIndividual: string;
        dataCadastro: string;
    }> = {
        rowOrder: ['prato', 'fichaIndividual', 'dataCadastro'],
        title: 'Pratos Cadastrados',
        filters: [
            { isActive: true, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: 'Total: 5 pratos cadastrados',
        header: ['Prato', 'Ficha Individual', 'Data de Cadastro'],
        data: [
            {
                rowData: {
                    prato: 'Spaghetti à Bolonhesa',
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: '10/10/2024',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    prato: 'Lasanha de Frango',
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: '12/10/2024',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    prato: 'Salmão ao Molho de Maracujá',
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: '15/10/2024',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    prato: 'Risoto de Cogumelos',
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: '18/10/2024',
                },
                componentType: ['text', 'button', 'text'],
            },
            {
                rowData: {
                    prato: 'Pizza Margherita',
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: '20/10/2024',
                },
                componentType: ['text', 'button', 'text'],
            },
        ],
        search: {
            placeholder: 'Buscar por ficha técnica',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 10,
            totalItems: 5,
        },
    };
    
}
