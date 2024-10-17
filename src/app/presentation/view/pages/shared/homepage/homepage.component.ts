import { Component, OnInit } from '@angular/core';
import { Homepage } from '@domain/static/interfaces';
import { homeData } from '@domain/static/data';
import {
    BannerLayoutComponent,
    FormLayoutComponent,
    SectionLayoutComponent,
} from '.';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DataTransferService } from '@domain/static/services';

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
