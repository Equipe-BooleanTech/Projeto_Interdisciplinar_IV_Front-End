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
    constructor(
        private _route: ActivatedRoute,
        private _datasheetGroupUseCase: DataSheetGroupUseCase,
    ) {}
    groupName = '';
    currentPage = 1;
    pageSize = 6;

    ngOnInit(): void {
        // Puxa o id da rota e procura o grupo de fichas associado.
        this._retrieveGroupSheet();
        // Carrega as fichas técnicas do grupo.
        this._loadDataSheets();
    }

    private _retrieveGroupSheet(): DataSheetGroupDto {
        this._route.paramMap.subscribe((params) => {
            const id: string = params.get('id') || '';
            this._datasheetGroupUseCase
                .getGroupById(id)
                .subscribe((response) => {
                    console.log(response);
                    return response;
                });
        });
        return {} as DataSheetGroupDto;
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.tabela.pagination.totalPages!) {
            this.currentPage = page;
            this._loadDataSheets();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    // Configuração da tabela de pratos cadastrados.
    private _loadDataSheets = (): void => {
        const groupSheet = this._retrieveGroupSheet();
        this.groupName = groupSheet.name;
        this.tabela.data = groupSheet.datasheets.map(
            (dataSheet: DataSheetDto) => ({
                rowData: {
                    prato: dataSheet.name,
                    fichaIndividual: 'Ver detalhes',
                    dataCadastro: dataSheet.createdAt || '',
                },
                componentType: ['text', 'button', 'text'],
            }),
        );
        this.tabela.pagination.totalItems = groupSheet.datasheets.length;
        this.tabela.metrics = 'Total: ' + groupSheet.datasheets.length;
    };

    tabela: TableConfig<{
        prato: string;
        dataCadastro: string;
        fichaIndividual: string;
    }> = {
        rowOrder: ['prato', 'dataCadastro', 'fichaIndividual'],
        title: 'Fichas técnicas cadastradas',
        filters: [
            { isActive: true, text: 'Ativas' },
            { isActive: false, text: 'Inativas' },
        ],
        metrics: '',
        header: ['Prato', 'Data de Cadastro', 'Ficha individual'],
        data: [],

        search: {
            placeholder: 'Buscar por ficha técnica',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
    };
}
