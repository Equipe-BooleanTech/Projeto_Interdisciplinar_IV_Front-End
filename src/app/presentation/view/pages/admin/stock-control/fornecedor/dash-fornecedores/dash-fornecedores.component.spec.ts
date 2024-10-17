import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFornecedoresComponent } from './dash-fornecedores.component';

describe('DashFornecedoresComponent', () => {
  let component: DashFornecedoresComponent;
  let fixture: ComponentFixture<DashFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashFornecedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
