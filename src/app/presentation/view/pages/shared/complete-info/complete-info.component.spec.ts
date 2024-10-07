import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInfoComponent } from './complete-info.component';

describe('CompleteInfoComponent', () => {
  let component: CompleteInfoComponent;
  let fixture: ComponentFixture<CompleteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
