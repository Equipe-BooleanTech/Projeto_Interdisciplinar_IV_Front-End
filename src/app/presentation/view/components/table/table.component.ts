import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  TableConfig } from '@domain/interfaces';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
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
        return (rowData as any)[key];
    }

    onSearch(value: string): void {
        if (!this.tableConfig.search) return;

        this.tableConfig.search.value = value;
    }

    onPageIncrease(): void {
        const pagination = this.tableConfig.pagination;
        if (
            pagination &&
            pagination.pageRange !== undefined &&
            pagination.totalItems !== undefined
        ) {
            if (pagination.pageRange < pagination.totalItems) {
                pagination.pageRange += 6;
            }

            if (pagination.pageRange > pagination.totalItems) {
                pagination.pageRange = pagination.totalItems;
            }
        }
    }

    onPageDecrease(): void {
        const pagination = this.tableConfig.pagination;
        if (pagination && pagination.pageRange !== undefined) {
            if (pagination.pageRange - 6 > 0) {
                pagination.pageRange -= 6;
            }
            if (pagination.pageRange < 6) {
                pagination.pageRange = Math.min(pagination.totalItems, 6);
            }
        }
    }
}
