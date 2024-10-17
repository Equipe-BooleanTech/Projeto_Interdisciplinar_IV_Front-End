import { TestBed } from '@angular/core/testing';

import { ActivateProspectionUseCase } from './activate-prospection.use-case.service';

describe('ActivateProspectionUseCase', () => {
    let service: ActivateProspectionUseCase;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ActivateProspectionUseCase);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
