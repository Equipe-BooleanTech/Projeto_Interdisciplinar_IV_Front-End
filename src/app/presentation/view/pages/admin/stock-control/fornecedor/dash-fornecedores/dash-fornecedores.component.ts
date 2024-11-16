import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatedResponse, SupplierDto } from '@domain/dtos';
import { TableConfig } from '@domain/static/interfaces';
import { SuppliersUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dash-fornecedores',
    standalone: true,
    imports: [
        SidebarComponent,
        TableComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './dash-fornecedores.component.html',
    styles: ``,
})
export class DashFornecedoresComponent implements OnInit, OnDestroy {
    constructor(private suppliersUseCase: SuppliersUseCase) {}

    private subscription: Subscription | null = null;
    currentPage = 1;
    pageSize = 6;

    ngOnInit(): void {
        this.subscription = this.suppliersUseCase.base$.subscribe(
            (suppliers: SupplierDto[]) => {
                this.tabela.data = suppliers.map((supplier: SupplierDto) => ({
                    rowData: {
                        supplier: supplier.name,
                        contactName: supplier.contact,
                        phone: supplier.phone,
                        action: {
                            url: '/admin/estoque/editar-fornecedor/' + supplier.id,
                            text: 'Ver mais',
                        },
                    },
                    componentType: ['text', 'text', 'text', 'button'],
                }));
            },
        );
        this.fetchSuppliers();
    }

    fetchSuppliers(): void {
        this.suppliersUseCase
            .getSuppliers(this.currentPage - 1, this.pageSize)
            .subscribe((response: PaginatedResponse<SupplierDto>) => {
                this.tabela.pagination.totalItems = response.totalElements;
                this.tabela.pagination.totalPages = Math.ceil(
                    response.totalElements / this.pageSize,
                );
                this.tabela.metrics = `Mostrando ${response.totalElements} fornecedores`;
            });
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.tabela.pagination.totalPages!) {
            this.currentPage = page;
            this.fetchSuppliers();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    tabela: TableConfig<{
        supplier: string;
        contactName: string;
        phone: string;
        action: {
            url: string;
            text: string;
        };
    }> = {
        rowOrder: ['supplier', 'contactName', 'phone', 'action'],
        title: 'Fornecedores Cadastrados e Atualizações',
        filters: [
            { isActive: true, text: 'Ativos' },
            { isActive: false, text: 'Inativos' },
        ],
        metrics: '',
        header: ['Fornecedor', 'Nome de Contato', 'Telefone', 'Ações'],
        data: [],

        search: {
            placeholder: 'Buscar por fornecedor',
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
}
