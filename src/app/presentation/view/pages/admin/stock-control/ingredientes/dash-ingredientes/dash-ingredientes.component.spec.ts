import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashIngredientesComponent } from './dash-ingredientes.component';

describe('DashIngredientesComponent', () => {
  let component: DashIngredientesComponent;
  let fixture: ComponentFixture<DashIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashIngredientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
