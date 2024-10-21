import { Component } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-ultimas-transacoes',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './ultimas-transacoes.component.html',
    styles: ``,
})
export class UltimasTransacoesComponent {
    constructor() {}

    tabela: TableConfig<{
        pedido: string;
        statusTransacao: string;
        valor: string;
        action: string;
    }> = {
        rowOrder: ['pedido', 'statusTransacao', 'valor', 'action'],
        title: 'Últimas Transações',
        filters: [
            { isActive: false, text: 'Pendentes' },
            { isActive: false, text: 'Concluídas' },
            { isActive: false, text: 'Falhadas' },
        ],

        metrics: 'Total: 3 transações',
        header: [
            'Número do Pedido',
            'Status da Transação',
            'Valor',
            'Detalhes',
        ],
        data: [
            {
                rowData: {
                    pedido: '#TXN8745612',
                    statusTransacao: 'Concluída',
                    valor: 'R$500,00',
                    action: 'Visualizar detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    pedido: '#TXN8745613',
                    statusTransacao: 'Pendente',
                    valor: 'R$150,00',
                    action: 'Visualizar detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    pedido: '#TXN8745614',
                    statusTransacao: 'Falhada',
                    valor: 'R$250,00',
                    action: 'Visualizar detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
        ],
        search: {
            onSearch: (value: string) => {
                console.log(value);
            },
            placeholder: 'Buscar por Pedido',
            value: '',
        },
        pagination: {
            pageRange: 10,
            totalItems: 50,
        },
    };
}
