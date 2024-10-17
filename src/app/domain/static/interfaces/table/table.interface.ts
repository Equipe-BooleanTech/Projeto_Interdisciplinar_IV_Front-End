export interface DataItem<T> {
    rowData: T;
    componentType: string[];
}

export interface RowData {
    [key: string]: string;
}

export interface TableConfig<T> {
    title: string;
    filters: { isActive: boolean; text: string }[];
    metrics: string;
    header: string[];
    data: DataItem<T>[];
    search: {
        placeholder: string;
        value: string;
    };
    pagination: {
        pageRange: number;
        totalItems: number;
    };
    rowOrder: string[];
}