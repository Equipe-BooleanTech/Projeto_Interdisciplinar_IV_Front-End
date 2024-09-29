import { TestBed } from '@angular/core/testing';

import { AuthenticateUsecaseService } from './authenticate-usecase.service';

describe('AuthenticateUsecaseService', () => {
  let service: AuthenticateUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
