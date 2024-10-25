import { Component } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import { ButtonComponent, SidebarComponent, TableComponent } from '@presentation/view/components';

@Component({
  selector: 'app-ultimos-pedidos',
  standalone: true,
  imports: [SidebarComponent, TableComponent, ButtonComponent],
  templateUrl: './ultimos-pedidos.component.html',
  styles: ``
})
export class UltimosPedidosComponent {

  constructor() { }

  tabela: TableConfig<{
    pedido: string;
    statusPedido: string;
    statusPagamento: string;
    valor: string;
    action: string;
}> = {
    rowOrder: ['pedido', 'statusPedido', 'statusPagamento', 'valor', 'action'],
    title: 'Histórico de Pedidos',
    filters: [
        { isActive: false, text: 'Em entrega' },
        { isActive: false, text: 'Entregues' },
        { isActive: false, text: 'Cancelados' },
    ],
    pagination: {
        pageRange: 1,
        totalItems: 10,
    },
    metrics: 'Total: 5 pedidos',
    header: [
        'Pedido',
        'Status de Pedido',
        'Status de Pagamento',
        'Valor',
        'Detalhes',
    ],
    data: [
        {
            rowData: {
                pedido: '#2841782758',
                statusPedido: 'Em entrega',
                statusPagamento: 'Pago',
                valor: 'R$ 948,55',
                action: 'Visualizar detalhes',
            },
            componentType: ['text', 'text', 'text', 'text', 'button'],
        },
        {
            rowData: {
                pedido: '#2841782712',
                statusPedido: 'Entregue',
                statusPagamento: 'Pago',
                valor: 'R$ 1.250,00',
                action: 'Visualizar detalhes',
            },
            componentType: ['text', 'text', 'text', 'text', 'button'],
        },
        {
            rowData: {
                pedido: '#2841782733',
                statusPedido: 'Cancelado',
                statusPagamento: 'Pagamento não efetuado',
                valor: 'R$ 948,55',
                action: 'Visualizar detalhes',
            },
            componentType: ['text', 'text', 'text', 'text', 'button'],
        },{
            rowData: {
                pedido: '#2841782798',
                statusPedido: 'Em entrega',
                statusPagamento: 'Pendente',
                valor: 'R$ 948,55',
                action: 'Visualizar detalhes',
            },
            componentType: ['text', 'text', 'text', 'text', 'button'],
        },{
            rowData: {
                pedido: '#2841782777',
                statusPedido: 'Em entrega',
                statusPagamento: 'Pendente',
                valor: 'R$ 948,55',
                action: 'Visualizar detalhes',
            },
            componentType: ['text', 'text', 'text', 'text', 'button'],
        },
    ],
    search: {
        placeholder: 'Buscar pedido',
        onSearch: (value: string) => {
            console.log(value);
        },
        value: '',
    },
};

}
