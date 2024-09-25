import { Component, OnInit } from '@angular/core';
import {
    BannerLayoutComponent,
    FormLayoutComponent,
    SectionLayoutComponent,
} from '.';
import { homeData } from '@infra/data';
import { DataTransferService } from '@infra/services';
import { Homepage } from '@domain/interfaces';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [
        SectionLayoutComponent,
        FormLayoutComponent,
        BannerLayoutComponent,
        FooterComponent,
    ],
    templateUrl: './homepage.component.html',
    styles: ``,
})
export class HomepageComponent implements OnInit {
    data: Homepage = homeData;
    constructor(private _dataTransferService: DataTransferService) {}

    ngOnInit(): void {
        this.sendData();
    }
    sendData(): void {
        this._dataTransferService.setData(homeData);
    }
}
