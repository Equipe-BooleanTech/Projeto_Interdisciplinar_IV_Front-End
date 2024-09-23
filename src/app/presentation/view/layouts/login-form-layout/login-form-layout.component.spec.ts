import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormLayoutComponent } from './login-form-layout.component';

describe('LoginFormLayoutComponent', () => {
  let component: LoginFormLayoutComponent;
  let fixture: ComponentFixture<LoginFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
