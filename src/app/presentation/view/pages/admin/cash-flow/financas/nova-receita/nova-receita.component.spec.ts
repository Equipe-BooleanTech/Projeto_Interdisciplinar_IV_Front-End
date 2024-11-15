import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaReceitaComponent } from './nova-receita.component';

describe('NovaReceitaComponent', () => {
    let component: NovaReceitaComponent;
    let fixture: ComponentFixture<NovaReceitaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NovaReceitaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NovaReceitaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
