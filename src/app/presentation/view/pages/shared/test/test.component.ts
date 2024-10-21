import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CardListComponent } from '../../../components/card-list/card-list.component';
import { CardList } from '@domain/static/interfaces';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CardComponent, SidebarComponent, CardListComponent],
    templateUrl: './test.component.html',
    styles: ``,
})
export class TestComponent {
    cardListConfig: CardList = {
        filters: [
            { isActive: false, text: 'Filtro 1' },
            { isActive: false, text: 'Filtro 2' },
            { isActive: false, text: 'Filtro 3' },
        ],
        title: 'Teste',
        cards: [
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
        ],
        search: {
            placeholder: 'Pesquise um prato por nome, ID ou categoria...',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
        rowOrder: [],
        metrics: '',
        header: [],
        data: [],
    };
}
