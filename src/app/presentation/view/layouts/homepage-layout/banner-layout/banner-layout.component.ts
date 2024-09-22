import { Component, OnInit } from '@angular/core';
import { ButtonComponent, CardComponent } from '@presentation/view/components';
import { DataTransferService } from '@infra/services';
import { Homepage } from '@domain/interfaces';

@Component({
    selector: 'app-banner-layout',
    standalone: true,
    imports: [ButtonComponent, CardComponent],
    templateUrl: './banner-layout.component.html',
    styles: [],
})
export class BannerLayoutComponent implements OnInit {
    homepageData: Homepage | null = null;

    constructor(private _dataTransferService: DataTransferService) {}

    ngOnInit(): void {
        this._dataTransferService.currentData.subscribe(
            (receivedData: Homepage) => {
                this.homepageData = receivedData;
            },
        );
    }

    get hasHomepageData(): boolean {
        return this.homepageData !== null;
    }
}
