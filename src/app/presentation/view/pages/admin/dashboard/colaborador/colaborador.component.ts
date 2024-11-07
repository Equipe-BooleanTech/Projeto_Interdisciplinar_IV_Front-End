import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginatedResponse, CollaboratorDto } from '@domain/dtos';
import { TableConfig } from '@domain/static/interfaces';
import { CollaboratorUseCase } from '@domain/usecases/admin';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
    WrapperComponent
} from '@presentation/view/components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-colaborador',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent, WrapperComponent],
    templateUrl: './colaborador.component.html',
    styles: ``,
})
export class ColaboradorComponent implements OnInit, OnDestroy {
    private subscription: Subscription | null = null;
    currentPage = 1;
    pageSize = 6;

    constructor(
        private location: Location,
        private collaboratorUseCase: CollaboratorUseCase,
    ) {}

    ngOnInit(): void {
        this.subscription = this.collaboratorUseCase.base$.subscribe(
            (collaborators: CollaboratorDto[]) => {
                this.tabela.data = collaborators.map(
                    (collaborator: CollaboratorDto) => ({
                        rowData: {
                            role:
                                collaborator.roles === 'ROLE_ADMIN'
                                    ? 'Administrador'
                                    : collaborator.roles === 'ROLE_CHEF'
                                      ? 'Chefe de Cozinha'
                                      : 'Garçom',
                            name: collaborator.fullName,
                            status: collaborator.isEmployee
                                ? 'Ativo'
                                : 'Inativo',
                            action: 'Ver mais',
                        },
                        componentType: ['text', 'text', 'text', 'button'],
                    }),
                );
            },
        );

        this.fetchCollaborators();
    }

    fetchCollaborators(): void {
        this.collaboratorUseCase.getAllCollaborators(this.currentPage - 1, this.pageSize).subscribe(
            (response: PaginatedResponse<CollaboratorDto>) => {
                this.tabela.pagination.totalItems = response.totalElements;
                this.tabela.pagination.totalPages = Math.ceil(response.totalElements / this.pageSize);
                this.tabela.metrics = `Mostrando ${response.content.length} de ${response.totalElements} colaboradores`;
            }
        );
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.tabela.pagination.totalPages!) {
            this.currentPage = page;
            this.fetchCollaborators();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
        metrics: "",
        header: ['Nome', 'Função', 'Status', 'Ações'],
        data: [],
        search: {
            placeholder: 'Procure por nome ou função...',
            value: '',
            onSearch: (value: string) => {
                console.log(value);
            },
        },
        pagination: {
            pageRange: 1,
            totalItems: 0,
            totalPages: 0,
            onPageChange: (page: number) => this.onPageChange(page),
        },
    };

    voltar() {
        this.location.back();
    }
}