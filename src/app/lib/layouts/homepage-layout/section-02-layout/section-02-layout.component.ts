import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@lib/components';
import { HomepageData } from '@lib/interfaces';
import { DataTransferService } from '@lib/services';

@Component({
    selector: 'app-section-02-layout',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './section-02-layout.component.html',
    styles: ``,
})
export class Section02LayoutComponent implements OnInit {
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
