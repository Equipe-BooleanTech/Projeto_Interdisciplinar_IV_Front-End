import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsLayoutComponent } from './components-layout.component';

describe('ComponentsLayoutComponent', () => {
  let component: ComponentsLayoutComponent;
  let fixture: ComponentFixture<ComponentsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
