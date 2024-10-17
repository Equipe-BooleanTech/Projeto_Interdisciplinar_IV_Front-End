import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFichasComponent } from './grupo-fichas.component';

describe('GrupoFichasComponent', () => {
  let component: GrupoFichasComponent;
  let fixture: ComponentFixture<GrupoFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoFichasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
