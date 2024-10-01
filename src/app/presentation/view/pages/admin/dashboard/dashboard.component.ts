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
    tabela: TableConfig<{
        numero: string;
        data: string;
        nomeCliente: string;
        valor: string;
        status: string;
    }> = {
        title: 'Histórico de Pedidos',
        filters: [
            { isActive: false, text: 'Em entrega' },
            { isActive: false, text: 'Entregues' },
            { isActive: false, text: 'Cancelados' },
        ],
        pagination: {
            pageRange: 10,
            totalItems: 100,
        },
        metrics: 'Total: 5 pedidos',
        header: [
            'Número do Pedido',
            'Data do Pedido',
            'Nome do Cliente',
            'Valor Recebido',
            'Status',
        ],
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
                    numero: '#2841782758',
                    data: '9/23/16',
                    nomeCliente: 'Jane Smith',
                    valor: '$948.55',
                    status: 'Shipping',
                },
                componentType: ['text', 'text', 'text', 'text', 'text'],
            },
        ],
        search: {
            placeholder: 'Buscar pedido',
            value: '',
        },
    };
}
