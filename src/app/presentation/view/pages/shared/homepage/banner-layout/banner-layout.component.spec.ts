import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerLayoutComponent } from './banner-layout.component';

describe('BannerLayoutComponent', () => {
  let component: BannerLayoutComponent;
  let fixture: ComponentFixture<BannerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
