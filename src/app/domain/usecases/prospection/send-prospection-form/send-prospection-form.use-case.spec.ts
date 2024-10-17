import { TestBed } from '@angular/core/testing';

import { SendProspectionFormUseCase } from './send-prospection-form.use-case';

describe('SendProspectionFormUseCase', () => {
    let service: SendProspectionFormUseCase;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SendProspectionFormUseCase);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
