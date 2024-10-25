import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleMesasComponent } from './controle-mesas.component';

describe('ControleMesasComponent', () => {
  let component: ControleMesasComponent;
  let fixture: ComponentFixture<ControleMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleMesasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
