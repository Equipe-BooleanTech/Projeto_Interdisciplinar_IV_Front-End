import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TableConfig } from '@domain/static/interfaces';
import { ButtonComponent, SidebarComponent, TableComponent } from '@presentation/view/components';

@Component({
  selector: 'app-grupo-financas',
  standalone: true,
  imports: [SidebarComponent, TableComponent, ButtonComponent, CommonModule],
  templateUrl: './grupo-financas.component.html',
  styles: ``
})
export class GrupoFinancasComponent {

  constructor() {}

tabela: TableConfig<{
    titulo: string;
    visualizar: string;
    editar: string;
    ultimaAtualizacao: string;
}> = {
  rowOrder: ['titulo', 'visualizar', 'editar', 'ultimaAtualizacao'],
  title: '',

  header: [
    'Título',
    'Visualizar',
    'Editar',
    'Última Atualização',
  ],
  data: [
    {
      rowData: {
        titulo: 'Fornecedor',
        visualizar: 'Visualizar finança',
        editar: 'Editar finança',
        ultimaAtualizacao: '24/10/2024',
      },
      componentType: ['text', 'button', 'button', 'text'],
    },
    {
      rowData: {
        titulo: 'Reembolso',
        visualizar: 'Visualizar finança',
        editar: 'Editar finança',
        ultimaAtualizacao: '21/04/2024',
      },
      componentType: ['text', 'button', 'button', 'text'],
    },
    {
      rowData: {
        titulo: 'Estoque',
        visualizar: 'Visualizar finança',
        editar: 'Editar finança',
        ultimaAtualizacao: '12/10/2024',
      },
      componentType: ['text', 'button', 'button', 'text'],
    },
   
  ],
  search: {
    onSearch: (value: string) => {
      console.log(value);
    },
    placeholder: 'Buscar por Título',
    value: '',
  },
  pagination: {
    pageRange: 10,
    totalItems: 50,
  },
  filters: [],
  metrics: ''
};
 

}
