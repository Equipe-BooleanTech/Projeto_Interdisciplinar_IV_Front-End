import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoGrupoComponent } from './novo-grupo.component';

describe('NovoGrupoComponent', () => {
  let component: NovoGrupoComponent;
  let fixture: ComponentFixture<NovoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
