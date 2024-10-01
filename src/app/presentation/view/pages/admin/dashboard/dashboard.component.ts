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
        ],
        pagination: {
            pageRange: 6,
            totalItems: 50,
        },
        metrics: 'Total: 5 pedidos',
        header: ['Data do Pedido', 'Número do Pedido', 'Status', 'Valor Recebido'],
        data: [
            {
                numero: '#2841782758',
                data: '9/23/16',
                valor: '$948.55',
                status: 'Shipping',
            },
            {
                numero: '#2841782757',
                data: '4/21/12',
                valor: '$106.58',
                status: 'Delivered',
            },
            {
                numero: '#2841782751',
                data: '12/4/17',
                valor: '$306.84',
                status: 'Delivered',
            },
            {
                numero: '#2841782752',
                data: '7/18/17',
                valor: '$275.43',
                status: 'Delivered',
            },
            {
                numero: '#2841782758',
                data: '1/31/14',
                valor: '$576.28',
                status: 'Delivered',
            },
        ],
        totalPages: 1,
        search: {
            placeholder: 'Buscar pedido',
            value: '',
        },
    };
}
