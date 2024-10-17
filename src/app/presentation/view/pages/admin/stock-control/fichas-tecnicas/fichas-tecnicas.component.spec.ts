import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasTecnicasComponent } from './fichas-tecnicas.component';

describe('FichasTecnicasComponent', () => {
  let component: FichasTecnicasComponent;
  let fixture: ComponentFixture<FichasTecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichasTecnicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichasTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
