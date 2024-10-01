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
    totalItems: number = 20;
    pageRange: number = 6;

    constructor() {}

    tabela: TableConfig = {
        title: 'Table Title',
        filters: [
            { isActive: true, text: 'Filter 1' },
            { isActive: false, text: 'Filter 2' },
            { isActive: false, text: 'Filter 3' },
        ],
        metrics: 'Table Metrics',
        header: ['Header 1', 'Header 2', 'Header 3'],
        data: [
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                },
            },
        ],
        totalPages: Math.round(this.totalItems / 6),
        search: {
            placeholder: 'Procure por...',
            value: '',
        },
    };
}
