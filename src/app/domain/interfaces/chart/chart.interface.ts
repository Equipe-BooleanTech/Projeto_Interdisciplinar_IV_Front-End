export interface ChartOptions<T> {
    colors: string[];
    series: {
        name: string;
        color: string;
        data: T[];
    }[];
    chart: {
        type: string;
        height: string;
        width: string;
        fontFamily: string;
        toolbar: {
            show: boolean;
        };
    };
    plotOptions?: {
        bar: {
            horizontal: boolean;
            columnWidth: string;
            borderRadiusApplication: string;
            borderRadius: number;
        };
    };
    tooltip?: {
        shared: boolean;
        intersect: boolean;
        style: {
            fontFamily: string;
        };
    };
    states?: {
        hover: {
            filter: {
                type: string;
                value: number;
            };
        };
    };
    stroke?: {
        show: boolean;
        width: number;
        colors: string[];
    };
    grid?: {
        show: boolean;
        strokeDashArray: number;
        padding: {
            left: number;
            right: number;
            top: number;
        };
    };
    dataLabels?: {
        enabled: boolean;
    };
    legend?: {
        show: boolean;
    };
    xaxis?: {
        floating: boolean;
        labels: {
            show: boolean;
            style: {
                fontFamily: string;
                cssClass: string;
            };
        };
        axisBorder: {
            show: boolean;
        };
        axisTicks: {
            show: boolean;
        };
    };
    yaxis?: {
        show: boolean;
    };
    fill?: {
        opacity: number;
    };
}

export interface PieChartOptions {
    type: string;
    series: number[];
    colors: string[];
    chart: {
        height: number;
        width: string;
        type: string;
    };
    stroke: {
        colors: string[];
        lineCap: string;
    };
    plotOptions: {
        pie: {
            labels: {
                show: boolean;
            };
            size: string;
            dataLabels: {
                offset: number;
            };
        };
    };
    labels: string[];
    dataLabels: {
        enabled: boolean;
        style: {
            fontFamily: string;
        };
    };
    legend: {
        position: string;
        fontFamily: string;
    };
    yaxis: {
        labels: {
            formatter: (value: number) => string;
        };
    };
    xaxis: {
        labels: {
            formatter: (value: number) => string;
        };
        axisTicks: {
            show: boolean;
        };
        axisBorder: {
            show: boolean;
        };
    };
}

export interface ChartMetrics<T> {
    title?: string;
    subtitle?: string;
    data: T[] | T;
}

// Abaixo, seguem as diferentes implementações de gráficos que podem ser utilizadas no projeto.

export interface LineColumnData {
    grossAmount: number;
    shortDescription: string;
    metric: string;
    title: string;
    total: number;
    average: number;
}

export interface PieData {
    title: string;
    dateRange: string;
    options: { href: string; text: string }[];
}

// ...
