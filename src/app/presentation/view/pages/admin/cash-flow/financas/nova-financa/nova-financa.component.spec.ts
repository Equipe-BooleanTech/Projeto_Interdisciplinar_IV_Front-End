import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaFinancaComponent } from './nova-financa.component';

describe('NovaFinancaComponent', () => {
  let component: NovaFinancaComponent;
  let fixture: ComponentFixture<NovaFinancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaFinancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaFinancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
