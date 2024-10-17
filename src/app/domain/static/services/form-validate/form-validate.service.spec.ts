import { TestBed } from '@angular/core/testing';

import { FormValidateService } from './form-validate.service';

describe('FormValidateService', () => {
  let service: FormValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
