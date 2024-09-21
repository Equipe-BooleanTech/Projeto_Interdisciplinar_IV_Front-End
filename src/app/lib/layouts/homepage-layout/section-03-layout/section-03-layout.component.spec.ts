import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section03LayoutComponent } from './section-03-layout.component';

describe('Section03LayoutComponent', () => {
  let component: Section03LayoutComponent;
  let fixture: ComponentFixture<Section03LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section03LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section03LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
