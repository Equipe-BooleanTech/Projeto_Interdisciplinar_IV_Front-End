import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section04LayoutComponent } from './section-04-layout.component';

describe('Section04LayoutComponent', () => {
  let component: Section04LayoutComponent;
  let fixture: ComponentFixture<Section04LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section04LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section04LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
