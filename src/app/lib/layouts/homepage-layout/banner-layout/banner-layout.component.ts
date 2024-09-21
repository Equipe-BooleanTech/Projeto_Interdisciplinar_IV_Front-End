import { Component, OnInit } from '@angular/core';
import { ButtonComponent, CardComponent } from '@lib/components';
import { DataTransferService } from '@lib/services/data-transfer/data-transfer.service';
import { HomepageData } from '@lib/interfaces';

@Component({
    selector: 'app-banner-layout',
    standalone: true,
    imports: [ButtonComponent, CardComponent],
    templateUrl: './banner-layout.component.html',
    styles: [],
})
export class BannerLayoutComponent implements OnInit {
    homepageData: HomepageData | null = null;

    constructor(private _dataTransferService: DataTransferService) {}

    ngOnInit(): void {
        this._dataTransferService.currentData.subscribe(
            (receivedData: HomepageData) => {
                this.homepageData = receivedData;
            },
        );
    }

    get hasHomepageData(): boolean {
        return this.homepageData !== null;
    }
}
