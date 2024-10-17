import { SidebarData } from '@domain/static/interfaces';

export const sidebarData: SidebarData = {
    data: [
        {
            id: 1,
            title: 'Dashboard',
            icon: 'icon-[lucide--home] p-4',
            link: '/admin',
            subItems: [
                {
                    id: 11,
                    title: 'Colaboradores',
                    icon: 'icon-[lucide--users] p-4',
                    link: '/admin/colaboradores',
                },
            ],
            isExpanded: false,
        },
        {
            id: 2,
            title: 'Controle de Caixa',
            icon: 'icon-[streamline--subscription-cashflow] p-4',
            link: '/admin/controle-caixa',
            subItems: [
                {
                    id: 21,
                    title: 'Painel do Contador',
                    icon: 'icon-[ph--calculator-duotone] p-4',
                    link: '/admin/controle-caixa/painel-contador',
                },
                {
                    id: 22,
                    title: 'Finanças',
                    icon: 'icon-[mdi--finance] p-4',
                    link: '/admin/controle-caixa/financas',
                },
            ],
            isExpanded: false,
        },
        {
            id: 3,
            title: 'Pedidos',
            icon: 'icon-[lets-icons--order] p-4',
            link: '/admin/pedidos',
            subItems: [
                {
                    id: 31,
                    title: 'Últimos Pedidos',
                    icon: 'icon-[mdi--order-bool-descending] p-4',
                    link: '/admin/pedidos/ultimos-pedidos',
                },
                {
                    id: 32,
                    title: 'Delivery',
                    icon: 'icon-[mdi--delivery-dining-electric] p-4',
                    link: '/admin/pedidos/delivery',
                },
                {
                    id: 33,
                    title: 'Controle de Mesas',
                    icon: 'icon-[material-symbols--table-restaurant-outline] p-4',
                    link: '/admin/pedidos/controle-de-mesas',
                },
            ],
            isExpanded: false,
        },
        {
            id: 4,
            title: 'Controle de Estoque',
            icon: 'icon-[lucide--boxes] p-4',
            link: '/admin/estoque',
            subItems: [
                {
                    id: 41,
                    title: 'Ingredientes',
                    icon: 'icon-[icon-park-outline--tomato] p-4',
                    link: '/admin/estoque/ingredientes',
                },
                {
                    id: 42,
                    title: 'Fichas Técnicas',
                    icon: 'icon-[clarity--form-line] p-4',
                    link: '/admin/estoque/fichas-tecnicas/',
                },
                {
                    id: 43,
                    title: 'Fornecedores',
                    icon: 'icon-[game-icons--hand-truck] p-4',
                    link: '/admin/estoque/fornecedores',
                },
            ],
            isExpanded: false,
        },
        {
            id: 5,
            title: 'Cardápio digital',
            icon: 'icon-[bx--food-menu] p-4',
            link: '/admin/cardapio-digital',
            subItems: [
                {
                    id: 51,
                    title: 'Novo Prato',
                    icon: 'icon-[mingcute--file-new-fill] p-4',
                    link: '/admin/cardapio-digital/novo-prato',
                },
                {
                    id: 52,
                    title: 'Editar Pratos',
                    icon: 'icon-[lucide--settings] p-4',
                    link: '/admin/cardapio-digital/editar-pratos',
                },
            ],
            isExpanded: false,
        },
    ],
};
