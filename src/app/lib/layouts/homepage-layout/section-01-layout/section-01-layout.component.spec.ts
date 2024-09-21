import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section01LayoutComponent } from './section-01-layout.component';

describe('Section01LayoutComponent', () => {
  let component: Section01LayoutComponent;
  let fixture: ComponentFixture<Section01LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section01LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section01LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
