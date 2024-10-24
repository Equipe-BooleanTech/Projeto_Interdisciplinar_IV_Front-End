import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
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
    constructor(private location: Location) {}

    tabela: TableConfig<{
        role: string;
        name: string;
        status: string;
        lastAccess: string;
        action: string;
    }> = {
        rowOrder: ['name', 'role', 'status', 'lastAccess', 'action'],
        title: 'Colaboradores Cadastrados e Status',
        filters: [
            { isActive: true, text: 'Todos' },
            { isActive: false, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: 'Total: 4 colaboradores, 3 ativos, 1 inativo',
        header: ['Nome', 'Função', 'Status', 'Data de Último Acesso', 'Ações'],
        data: [
            {
                rowData: {
                    role: 'Chefe de Cozinha',
                    name: 'Henrique Costa',
                    status: 'Ativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Gerente',
                    name: 'Henrique Costa',
                    status: 'Inativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Garçom',
                    name: 'Henrique Costa',
                    status: 'Ativo',
                    lastAccess: '17/11/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'text', 'button'],
            },
            {
                rowData: {
                    role: 'Recepcionista',
                    name: 'Julia Almeida',
                    status: 'Ativo',
                    lastAccess: '12/09/2023',
                    action: 'Detalhes',
                },
                componentType: ['text', 'text', 'text', 'text', 'button'],
            },
        ],
        search: {
            placeholder: 'Procure por nome ou função...',
            value: '',
            onSearch: (value: string) => {
                console.log(value);
            },
        },
        pagination: {
            pageRange: 4,
            totalItems: 4,
        },
    };
    cadastrarNovoColaborador(): void {
        // Lógica para abrir o formulário de cadastro ou navegar para a página de cadastro
        console.log('Abrir formulário de cadastro');
    }
    voltar() {
        this.location.back();
      }
}
