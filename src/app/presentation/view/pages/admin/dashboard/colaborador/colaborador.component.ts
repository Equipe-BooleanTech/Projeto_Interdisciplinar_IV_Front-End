import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CollaboratorDto } from '@domain/dtos';
import { TableConfig } from '@domain/static/interfaces';
import { CollaboratorUseCase } from '@domain/usecases/admin';
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
export class ColaboradorComponent implements OnInit {
    constructor(
        private location: Location,
        private collaboratorUseCase: CollaboratorUseCase,
    ) {}

    ngOnInit(): void {
        this.collaboratorUseCase
            .getAllCollaborators()
            .subscribe((response: { content: CollaboratorDto[] }) => {
                            const collaborators = response.content;
                console.log(collaborators);
                this.tabela.data = collaborators.map((collaborator) => ({
                    rowData: {
                        role:
                            collaborator.roles === 'ROLE_ADMIN'
                                ? 'Administrador'
                                : collaborator.roles === 'ROLE_CHEF'
                                  ? 'Chefe de Cozinha'
                                  : 'Garçom',
                        name: collaborator.fullName,
                        status: collaborator.isEmployee ? 'Ativo' : 'Inativo',
                        action: 'Ver mais',
                    },
                    componentType: ['text', 'text', 'text', 'button'],
                }));

                this.tabela.pagination.totalItems = collaborators.length;
                this.tabela.pagination.pageRange = collaborators.length / 2;
                this.tabela.metrics = `Mostrando ${collaborators.length} de ${collaborators.length} colaboradores`;
            });
    }

    tabela: TableConfig<{
        role: string;
        name: string;
        status: string;
        action: string;
    }> = {
        rowOrder: ['name', 'role', 'status', 'action'],
        title: 'Colaboradores Cadastrados e Status',
        filters: [
            { isActive: true, text: 'Todos' },
            { isActive: false, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: "Mostrando {0} de {1} colaboradores",
        header: ['Nome', 'Função', 'Status', 'Ações'],
        data: [
            
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
            totalItems: 0,
        },
        };
    
    voltar() {
        this.location.back();
    }
}
