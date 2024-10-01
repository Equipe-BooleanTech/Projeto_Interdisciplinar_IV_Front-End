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
        role: string;
        name: string;
        status: string;
        lastAccess: string;
        action: string;
    }> = {
        title: 'Employee Roles and Status',
        filters: [
            { isActive: true, text: 'Ativo' },
            { isActive: false, text: 'Inativo' },
        ],
        metrics: 'Total: 4 items, 3 Active, 1 Inactive',
        header: ['Nome e Função', 'Status', 'Data de Último Acesso', 'Ações'],
        data: [
            {
                rowData: {
                    role: 'Chefe de Cozinha',
                    name: 'Henrique Costa',
                    status: 'Ativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Gerente',
                    name: 'Henrique Costa',
                    status: 'Inativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Garçom',
                    name: 'Henrique Costa',
                    status: 'Ativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Recepcionista',
                    name: 'Julia Almeida',
                    status: 'Ativo',
                    lastAccess: '12/09/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'button'],
            },
        ],
        search: {
            placeholder: 'Search by name or role',
            value: '',
        },
        pagination: {
            pageRange: 4,
            totalItems: 4,
        },
    };
}
