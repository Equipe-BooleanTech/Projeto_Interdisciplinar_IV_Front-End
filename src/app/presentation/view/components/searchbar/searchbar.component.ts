import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchbarConfig } from '@domain/static/interfaces';

@Component({
    selector: 'app-searchbar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './searchbar.component.html',
    styles: ``,
})
export class SearchbarComponent {
    @Input() searchBarConfig!: SearchbarConfig;

    onSearch(value: string): void {
        if (!value) return;
        this.searchBarConfig.value = value;
    }

    handleChange(value: string): void {
        this.searchBarConfig.value = value;
    }
}
