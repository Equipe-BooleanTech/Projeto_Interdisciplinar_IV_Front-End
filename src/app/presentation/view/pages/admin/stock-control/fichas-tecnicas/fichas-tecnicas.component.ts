import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataSheetGroupUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    CardComponent,
    SidebarComponent,
} from '@presentation/view/components';
interface CardData {
    title: string;
    link: string;
}

@Component({
    selector: 'app-fichas-tecnicas',
    standalone: true,
    imports: [SidebarComponent, CardComponent, ButtonComponent, CommonModule],
    templateUrl: './fichas-tecnicas.component.html',
    styles: ``,
})
export class FichasTecnicasComponent implements OnInit {
    cards: CardData[] = [];

    constructor(private _dataSheetGroupUseCase: DataSheetGroupUseCase) {}

    ngOnInit(): void {
        this._dataSheetGroupUseCase
            .getDatasheetsGroup(0, 9999)
            .subscribe((response) => {
                this.cards = response.content.map((group) => ({
                    title: group.name,
                    link: `./admin/estoque/fichas-tecnicas/grupo-fichas/${group.id}`,
                }));
            });
    }
}
