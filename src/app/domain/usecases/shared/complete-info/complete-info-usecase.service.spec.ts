import { TestBed } from '@angular/core/testing';

import { CompleteInfoUsecaseService } from './complete-info-usecase.service';

describe('CompleteInfoUsecaseService', () => {
  let service: CompleteInfoUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteInfoUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
