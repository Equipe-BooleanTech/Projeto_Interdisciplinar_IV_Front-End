import { Component } from '@angular/core';
import { CardList } from '@domain/static/interfaces';
import { ButtonComponent, CardListComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-controle-mesas',
  standalone: true,
  imports: [SidebarComponent, CardListComponent, ButtonComponent],
  templateUrl: './controle-mesas.component.html',
  styles: ``
})
export class ControleMesasComponent {

  cardListConfig: CardList = {
    filters: [
        { isActive: false, text: 'Todos' },
        { isActive: false, text: 'Em Andamento' },
        { isActive: false, text: 'Cancelados' },
    ],
    title: 'Últimos Pedidos',
    cards: [
        {
            heading: 'Mesa 1',
            buttonText: 'Ver mais',
            link: '/admin/orders/controle-mesas/mesa-1',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 2',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 3',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 4',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 5',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 6',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 7',
            buttonText: 'Ver mais',
            link: '/',
            imgSrc: '../../../../../../assets/logo.svg',
        },
        {
            heading: 'Mesa 8',
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
