import { Component } from '@angular/core';
import { TableConfig } from '@domain/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-colaborador',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './colaborador.component.html',
    styles: ``,
})
export class ColaboradorComponent {
    constructor() {}


    tabela: TableConfig<{
        numero: string;
        data: string;
        cliente: string;
        valor: string;
        status: string;
    }> = {
        title: 'Example Table',
        rowOrder: ['numero', 'data', 'cliente', 'valor', 'status'],
        filters: [{ isActive: true, text: 'Active' }],
        metrics: 'Metrics',
        header: ['Numero', 'Data', 'Nome do Cliente', 'Valor', 'Status'],
        data: [
            {
                rowData: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    cliente: 'John Doe',
                    valor: '$948.55',
                    status: 'Shipping',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
            {
                rowData: {
                    numero: '#2841782759',
                    data: '9/24/16',
                    cliente: 'Jane Doe',
                    valor: '$123.45',
                    status: 'Delivered',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
        ],
        search: {
            placeholder: 'Search...',
            value: '',
        },
        pagination: {
            pageRange: 10,
            totalItems: 2,
        },
    };
}
