import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngredientDto, PaginatedResponse } from '@domain/dtos';
import { TableConfig } from '@domain/static/interfaces';
import { IngredientsUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dash-ingredientes',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './dash-ingredientes.component.html',
    styles: ``,
})
export class DashIngredientesComponent implements OnInit, OnDestroy {
    constructor(private ingredientsUseCase: IngredientsUseCase) {}

    private subscription: Subscription | null = null;
    currentPage = 1;
    pageSize = 6;

    ngOnInit(): void {
        this.subscription = this.ingredientsUseCase.base$.subscribe(
            (ingredient: IngredientDto[]) => {
                this.tabela.data = ingredient.map(
                    (ingredient: IngredientDto) => ({
                        rowData: {
                            ingredient: ingredient.name,
                            suppliers: ingredient.supplier
                                .map((s) => s.name)
                                .join(', '),
                            quantity_unit:
                                ingredient.quantity + '/' + ingredient.unit,
                            price: ingredient.price.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }),
                            action: {
                                url:
                                    '/admin/estoque/editar-ingrediente/' +
                                    ingredient.id,
                                text: 'Ver mais',
                            },
                        },
                        componentType: [
                            'text',
                            'text',
                            'text',
                            'text',
                            'button',
                        ],
                    }),
                );
            },
        );
        this.fetchIngredients();
    }

    fetchIngredients(): void {
        this.ingredientsUseCase
            .getIngredients(this.currentPage - 1, this.pageSize)
            .subscribe((response: PaginatedResponse<IngredientDto>) => {
                this.tabela.pagination.totalItems = response.totalElements;
                this.tabela.pagination.totalPages = Math.ceil(
                    response.totalElements / this.pageSize,
                );
                this.tabela.metrics = `Total: ${response.totalElements} ingredientes`;
            });
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.tabela.pagination.totalPages!) {
            this.currentPage = page;
            this.fetchIngredients();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    tabela: TableConfig<{
        ingredient: string;
        suppliers: string;
        quantity_unit: string;
        price: string;
        action: {
            url: string;
            text: string;
        };
    }> = {
        rowOrder: [
            'ingredient',
            'suppliers',
            'quantity_unit',
            'price',
            'action',
        ],
        title: 'Ingredientes Cadastrados',
        filters: [
            { isActive: true, text: 'Disponíveis' },
            { isActive: false, text: 'Indisponíveis' },
        ],
        metrics: '',
        header: [
            'Ingrediente',
            'Fornecedores Associados',
            'Quantidade por Unidade de Medida',
            'Preço',
            'Ações',
        ],
        data: [],

        search: {
            placeholder: 'Buscar por ingrediente',
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
