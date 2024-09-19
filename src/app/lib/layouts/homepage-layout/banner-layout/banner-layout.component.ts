import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../..';
import { ButtonComponent, CardComponent } from '@lib/components';
import { SharedDataService } from '@lib/services';

@Component({
  selector: 'app-banner-layout',
  standalone: true,
  imports: [SectionLayoutComponent, ButtonComponent, CardComponent],
  templateUrl: './banner-layout.component.html',
  styles: ``
})
export class BannerLayoutComponent {
  constructor(public homepageData: SharedDataService) {}
}
