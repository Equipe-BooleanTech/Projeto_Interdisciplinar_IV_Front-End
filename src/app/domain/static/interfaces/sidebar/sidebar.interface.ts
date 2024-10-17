export interface SidebarData {
    data: SidebarItem[];
}

export interface SidebarItem {
    id: number;
    title: string;
    icon: string;
    link: string;
    isExpanded: boolean;
    subItems: {
        id: number;
        title: string;
        icon: string;
        link: string;
    }[];
}
