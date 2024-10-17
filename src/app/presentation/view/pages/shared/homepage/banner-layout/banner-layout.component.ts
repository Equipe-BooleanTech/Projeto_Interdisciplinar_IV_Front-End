import { Component, OnInit } from '@angular/core';
import { Homepage } from '@domain/static/interfaces';
import { DataTransferService } from '@domain/static/services';
import { ButtonComponent, CardComponent } from '@presentation/view/components';

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
            (receivedData: Homepage | null) => {
                this.homepageData = receivedData;
            },
        );
    }

    get hasHomepageData(): boolean {
        return this.homepageData !== null;
    }
}
