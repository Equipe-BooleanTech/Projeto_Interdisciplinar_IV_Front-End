import { Component } from '@angular/core';
import { TableConfig } from '@domain/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

interface ExampleRowData {
    numero: string;
    data: string;
    nomeCliente: string;
    valor: string;
    status: string;
}

@Component({
    selector: 'app-colaborador',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './colaborador.component.html',
    styles: ``,
})
export class ColaboradorComponent {
    constructor() {}

    tabela: TableConfig<ExampleRowData> = {
        title: 'Example Table',
        filters: [{ isActive: true, text: 'Active' }],
        metrics: 'Metrics',
        header: ['numero', 'data', 'nomeCliente', 'valor', 'status'],
        data: [
            {
                rowData: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    nomeCliente: 'John Doe',
                    valor: '$948.55',
                    status: 'Shipping',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
            {
                rowData: {
                    numero: '#2841782759',
                    data: '9/24/16',
                    nomeCliente: 'Jane Doe',
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
