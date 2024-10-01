import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableConfig } from '@domain/interfaces';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styles: ``,
})
export class TableComponent {

    @Input() tableConfig: TableConfig ={};
    @Input() totalItems: number = 0;
    @Input() pageRange: number = 0;


    

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

    onSearch(value: string): void {
        if (!this.tableConfig.search) return;

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