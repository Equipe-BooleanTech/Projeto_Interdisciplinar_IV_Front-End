import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSheetDto, DataSheetGroupDto } from '@domain/dtos';
import { TableConfig } from '@domain/static/interfaces';
import { DataSheetGroupUseCase, DataSheetUseCase } from '@domain/usecases';
import {
    ButtonComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-grupo-fichas',
    standalone: true,
    imports: [SidebarComponent, TableComponent, ButtonComponent],
    templateUrl: './grupo-fichas.component.html',
    styles: ``,
})
export class GrupoFichasComponent implements OnInit, OnDestroy {
    subscription: Subscription | null = null;
    groupName = '';
    currentPage = 1;
    pageSize = 6;
    tabela: TableConfig<{
        prato: string;
        dataCadastro: string;
        acoes: {
            text: string;
            url: string;
        };
    }> = {
        rowOrder: ['prato', 'dataCadastro', 'acoes'],
        title: 'Fichas técnicas cadastradas',
        filters: [
            { isActive: true, text: 'Ativas' },
            { isActive: false, text: 'Inativas' },
        ],
        metrics: '',
        header: ['Prato', 'Data de Cadastro', 'Ações'],
        data: [],
        search: {
            placeholder: 'Buscar por ficha técnica',
            value: '',
            onSearch: (value: string): void => {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
    };

    constructor(
        private _route: ActivatedRoute,
        private _datasheetGroupUseCase: DataSheetGroupUseCase,
    ) {}

    ngOnInit(): void {
        this._retrieveGroupSheet();
    }

    private _retrieveGroupSheet() {
        this._route.paramMap.subscribe((params) => {
            const id: string = params.get('id') || '';
            this.subscription = this._datasheetGroupUseCase
                .getGroupById(id)
                .subscribe((response: DataSheetGroupDto) => {
                    if (response) {
                        this.groupName = response.name;
                        this._loadDataSheets(response);
                    }
                });
        });
    }

    onPageChange(page: number): void {
        if (
            page >= 1 &&
            page <= this.tabela.pagination.totalItems / this.pageSize
        ) {
            this.currentPage = page;
            this._retrieveGroupSheet();
        }
    }

    protected getGroupLink() {
        const id: string = this._route.snapshot.params['id'];
        return `admin/estoque/fichas-tecnicas/editar-grupo/${id}`;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private _loadDataSheets(groupSheet: DataSheetGroupDto): void {
        this.tabela.data = groupSheet.datasheets.map(
            (dataSheet: DataSheetDto) => ({
                rowData: {
                    prato: dataSheet.name,
                    dataCadastro: dataSheet.createdAt || '',
                    acoes: {
                        text: 'Visualizar/Editar Ficha',
                        url: `/admin/estoque/fichas-tecnicas/editar-ficha/${dataSheet.id}`,
                    },
                },
                componentType: ['text', 'text', 'button'],
            }),
        );
        this.tabela.pagination.totalItems = groupSheet.datasheets.length;
        this.tabela.metrics =
            'Total: ' + groupSheet.datasheets.length + ' fichas técnicas';
    }
}
