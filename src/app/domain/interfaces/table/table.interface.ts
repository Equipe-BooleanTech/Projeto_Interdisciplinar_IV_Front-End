export interface TableConfig {
    title?: string;
    filters?: { isActive: boolean; text: string }[];
    metrics?: string;
    header?: string[];
    data?: {
        component: string;
        value: any;
    }[];
    totalPages?: number;
    search?: {
        placeholder: string;
        value: string;
    };
    pagination?: {
        pageRange: number;
        totalItems: number;
    };
}