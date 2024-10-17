import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancasComponent } from './financas.component';

describe('FinancasComponent', () => {
  let component: FinancasComponent;
  let fixture: ComponentFixture<FinancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
