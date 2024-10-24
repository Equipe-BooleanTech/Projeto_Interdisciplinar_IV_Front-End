import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFinancasComponent } from './grupo-financas.component';

describe('GrupoFinancasComponent', () => {
  let component: GrupoFinancasComponent;
  let fixture: ComponentFixture<GrupoFinancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoFinancasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoFinancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
