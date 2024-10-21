export interface SearchbarConfig {
    value: string;
    placeholder: string;
    icon?: string;
    onSearch: (value: string) => void;
}