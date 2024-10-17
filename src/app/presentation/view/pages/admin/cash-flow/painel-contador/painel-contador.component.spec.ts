import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelContadorComponent } from './painel-contador.component';

describe('PainelContadorComponent', () => {
  let component: PainelContadorComponent;
  let fixture: ComponentFixture<PainelContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelContadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
