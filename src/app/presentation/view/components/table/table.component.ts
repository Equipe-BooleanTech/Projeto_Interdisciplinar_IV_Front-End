import { Component } from '@angular/core';
import { TableConfig } from '@domain/interfaces';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styles: ``,
})
export class TableComponent {
    totalItems: number = 28;
    pageRange: number = 6;
    constructor() {}

    tableConfig: TableConfig = {
        title: 'Table Title',
        filters: [
            { isActive: true, text: 'Filter 1' },
            { isActive: false, text: 'Filter 2' },
            { isActive: false, text: 'Filter 3' },
        ],
        metrics: 'Table Metrics',
        header: ['Header 1', 'Header 2', 'Header 3'],
        data: [
            { id: 1, name: 'Name 1', description: 'Description 1' },
            { id: 2, name: 'Name 2', description: 'Description 2' },
            { id: 3, name: 'Name 3', description: 'Description 3' },
        ],
        totalPages: Math.round(this.totalItems / 6),
        search: {
            placeholder: 'Procure por...',
            value: '',
        },
    };

    onFilterClick(filter: { isActive: boolean; text: string }): void {
        filter.isActive = !filter.isActive;
        //Deixando os outros filtros inativos
        this.tableConfig.filters.forEach((f) => {
            if (f.text !== filter.text) {
                f.isActive = false;
            }
        });
    }

    onSearch(value: string): void {
        this.tableConfig.search.value = value;
    }

    onPageIncrease(): void {
        if (this.pageRange < this.totalItems) {
            this.pageRange += 6;
        }

        if (this.pageRange > this.totalItems) {
            this.pageRange = this.totalItems;
        }
    }

    onPageDecrease(): void {
        if (this.pageRange - 6 > 0) {
            this.pageRange -= 6;
        }
        if (this.pageRange < 6) {
            this.pageRange = 6;
        }
    }
}
