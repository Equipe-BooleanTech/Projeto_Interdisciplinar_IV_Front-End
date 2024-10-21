import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableConfig } from '@domain/static/interfaces';
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, SearchbarComponent],
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
        if (pagination && pagination.pageRange !== undefined) {
            pagination.pageRange++;
        }
    }

    onPageDecrease(): void {
        const pagination = this.tableConfig.pagination;
        if(pagination.pageRange <= 1) return;
        if (pagination && pagination.pageRange !== undefined) {
            pagination.pageRange--;
        }
    }
}
