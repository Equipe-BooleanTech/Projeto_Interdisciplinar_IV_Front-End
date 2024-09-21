import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section02LayoutComponent } from './section-02-layout.component';

describe('Section02LayoutComponent', () => {
  let component: Section02LayoutComponent;
  let fixture: ComponentFixture<Section02LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section02LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section02LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
