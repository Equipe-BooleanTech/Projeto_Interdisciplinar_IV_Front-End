import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasTransacoesComponent } from './ultimas-transacoes.component';

describe('UltimasTransacoesComponent', () => {
  let component: UltimasTransacoesComponent;
  let fixture: ComponentFixture<UltimasTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimasTransacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimasTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
