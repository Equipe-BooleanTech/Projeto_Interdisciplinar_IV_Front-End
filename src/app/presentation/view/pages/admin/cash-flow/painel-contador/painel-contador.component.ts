import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
    CardList,
    PieChartOptions,
    PieMetrics,
    TableConfig
} from '@domain/static/interfaces';
import { ButtonComponent, CardComponent, SidebarComponent } from '@presentation/view/components';
import { LineColumnComponent, PieComponent } from '@presentation/view/components/chart';
import ApexCharts from 'apexcharts';
import { CardListComponent } from "../../../../components/card-list/card-list.component";
import { TableComponent } from "../../../../components/table/table.component";


@Component({
    selector: 'app-painel-contador',
    standalone: true,
    imports: [
        SidebarComponent,
        LineColumnComponent,
        CardComponent,
        TableComponent,
        PieComponent,
        CommonModule,
        ButtonComponent,
        CardListComponent,
    ],
    templateUrl: './painel-contador.component.html',
    styles: ``,
})
export class PainelContadorComponent {
    constructor(private location: Location) {}

    tabela: TableConfig<{
        titulo: string;
        valor: string;
    }> = {
        rowOrder: ['titulo', 'valor'],
        title: 'Ultimas Movimentações',
        filters: [
            { isActive: false, text: 'Últimos 30 dias' },
            { isActive: false, text: 'Últimos 60 dias' },
            { isActive: false, text: 'Últimos 90 dias' },
        ],
        metrics: 'Total: 5 relatórios',
        header: ['Título', 'Valor'],
        data: [
            {
                rowData: {
                    titulo: 'Faturamento Bruto',
                    valor: 'R$12.500,00',
                },
                componentType: ['text', 'text'],
            },
            {
                rowData: {
                    titulo: 'Despesas Operacionais',
                    valor: 'R$8.000,00',
                },
                componentType: ['text', 'text'],
            },
            {
                rowData: {
                    titulo: 'Lucro Líquido',
                    valor: 'R$4.500,00',
                },
                componentType: ['text', 'text'],
            },
            {
                rowData: {
                    titulo: 'Impostos',
                    valor: 'R$2.500,00',
                },
                componentType: ['text', 'text'],
            },
            {
                rowData: {
                    titulo: 'Total Recebido',
                    valor: 'R$62.450,00',
                },
                componentType: ['text', 'text'],
            },
        ],
        search: {
            placeholder: '',
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
    metrics: PieMetrics = {
        title: '',
        dateRange: '08/10/2023 - 08/10/2024',
        options: [
            { href: '#', text: 'Exportar' },
            { href: '#', text: 'Compartilhar' },
        ],
    };
    data: PieChartOptions = {
        type: 'pie',
        series: [28, 72],
        colors: ['#740318', '#2E7D32'],
        chart: {
            height: '100%',
            width: '100%',
            type: 'pie',
        },
        stroke: {
            colors: ['white'],
            lineCap: '',
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true,
                },
                size: '100%',
                dataLabels: {
                    offset: -25,
                },
            },
        },
        labels: ['Despesas', 'Receitas'],
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: 'DM Sans, sans-serif',
            },
        },
        legend: {
            position: 'bottom',
            fontFamily: 'DM Sans, sans-serif',
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + '%';
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + '%';
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };
    ngAfterViewInit(): void {
        if (
            document.getElementById('stock-chart') &&
            typeof ApexCharts !== 'undefined'
        ) {
            const chart = new ApexCharts(
                document.getElementById('stock-chart'),
                this.data,
            );
            chart.render();
        }
    }

    cardListConfig: CardList = {
        title: 'Teste',
        cards: [
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
            {
                heading: 'Teste 1',
                buttonText: 'Ver mais',
                link: '/',
                imgSrc: '../../../../../../assets/logo.svg',
            },
        ],
        filters: [],
        metrics: '',
        header: [],
        data: [],
        search: {
            placeholder: '',
            value: '',
            onSearch: function (value: string): void {
                throw new Error('Function not implemented.');
            },
        },
        pagination: {
            pageRange: 0,
            totalItems: 0,
        },
        rowOrder: [],
    };
    voltar() {
        this.location.back();
    }
}
