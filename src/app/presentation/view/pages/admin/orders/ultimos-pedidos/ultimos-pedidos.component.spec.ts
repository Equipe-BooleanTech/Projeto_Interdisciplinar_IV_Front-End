import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosPedidosComponent } from './ultimos-pedidos.component';

describe('UltimosPedidosComponent', () => {
  let component: UltimosPedidosComponent;
  let fixture: ComponentFixture<UltimosPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimosPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
