import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardList } from '@domain/static/interfaces';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-card-list',
    standalone: true,
    imports: [CommonModule, SearchbarComponent, CardComponent],
    templateUrl: './card-list.component.html',
    styles: ``,
})
export class CardListComponent {
    @Input() cardListConfig!: CardList;

    onFilterClick(filter: { isActive: boolean; text: string }): void {
        if (!this.cardListConfig.filters) return;

        filter.isActive = !filter.isActive;
        // Deixando os outros filtros inativos
        this.cardListConfig.filters.forEach((f) => {
            if (f.text !== filter.text) {
                f.isActive = false;
            }
        });
    }

    onSearch(value: string): void {
        if (!this.cardListConfig.search) return;

        this.cardListConfig.search.value = value;
    }

    onPageChange(pageRange: number): void {
        const pagination = this.cardListConfig.pagination;
        if (pagination && pagination.pageRange !== undefined) {
            pagination.pageRange = pageRange;
        }

        // Futuramente, serão implementadas as chamadas para a API, bem como a atualização dos dados.
    }
}
