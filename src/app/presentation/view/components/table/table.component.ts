import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, SearchbarComponent, RouterLink],
    templateUrl: './table.component.html',
    styles: ``,
})
export class TableComponent<T extends Record<string, unknown>> {
    @Input() tableConfig!: TableConfig<T>;

    onFilterClick(filter: { isActive: boolean; text: string }): void {
        if (!this.tableConfig.filters) return;

        filter.isActive = !filter.isActive;
        // Deixando os outros filtros inativos
        this.tableConfig.filters.forEach((f) => {
            if (f.text !== filter.text) {
                f.isActive = false;
            }
        });
    }

    getRowDataValue(rowData: T, key: string): any {
        const value = (rowData as any)[key];
        return value instanceof Object ? value : value; // Se for um objeto (como `action`), retorna o objeto inteiro
    }

    onSearch(value: string): void {
        if (!this.tableConfig.search) return;

        this.tableConfig.search.value = value;
    }

    onPageIncrease(): void {
        const pagination = this.tableConfig.pagination;
        const totalPages = this.tableConfig.pagination.totalPages!;
        if (
            pagination &&
            pagination.pageRange !== undefined &&
            pagination.pageRange < totalPages
        ) {
            pagination.pageRange++;
            if (pagination.onPageChange) {
                pagination.onPageChange(pagination.pageRange);
            }
        }
    }

    onPageDecrease(): void {
        const pagination = this.tableConfig.pagination;
        if (pagination.pageRange <= 1) return;
        if (pagination && pagination.pageRange !== undefined) {
            pagination.pageRange--;
            if (pagination.onPageChange) {
                pagination.onPageChange(pagination.pageRange);
            }
        }
    }
}
