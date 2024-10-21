import { TableConfig } from '../table/table.interface';

export interface CardList extends TableConfig<Card> {
    title: string;
    cards: Card[];
}

interface Card {
    heading: string;
    imgSrc: string;
    buttonText: string;
    link: string;
}
