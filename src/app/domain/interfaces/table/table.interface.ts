export interface TableConfig {
    title?: string;
    filters?: { isActive: boolean; text: string }[];
    metrics?: string;
    header?: string[];
    data?: any;
    totalPages?: number;
    search?: {
        placeholder: string;
        value: string;
    };
}
