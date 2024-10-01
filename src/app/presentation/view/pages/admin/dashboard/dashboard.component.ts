import { Component } from '@angular/core';
import { TableConfig } from '@domain/interfaces';
import { CardComponent, SidebarComponent } from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { TableComponent } from '../../../components/table/table.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        LineColumnComponent,
        TableComponent,
    ],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent {
        tabela: TableConfig = {
        title: 'Histórico de Pedidos',
        filters: [
            { isActive: false, text: 'Shipping' },
            { isActive: false, text: 'Delivered' },
            { isActive: false, text: 'Canceled' },
        ],
        pagination: {
            pageRange: 10,
            totalItems: 100,
        },
        metrics: 'Total: 5 pedidos',
        header: [
            'Data do Pedido',
            'Número do Pedido',
            'Status',
            'Valor Recebido',
            'Customer Name',
        ],
        data: [
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                    customerName: 'John Doe',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                    customerName: 'Jane Smith',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                    customerName: 'Alice Johnson',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                    customerName: 'Bob Brown',
                },
            },
            {
                component: 'text',
                value: {
                    numero: '#2841782758',
                    data: '9/23/16',
                    valor: '$948.55',
                    status: 'Shipping',
                    customerName: 'Charlie Davis',
                },
            },
        ],
        totalPages: 2,
        search: {
            placeholder: 'Buscar pedido',
            value: '',
        },
    };
}
