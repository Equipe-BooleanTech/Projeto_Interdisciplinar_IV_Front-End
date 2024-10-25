import { Routes } from '@angular/router';
import {
    CadastroColaboradorComponent,
    CashFlowComponent,
    ColaboradorComponent,
    DashboardComponent,
    DashFornecedoresComponent,
    DashIngredientesComponent,
    FichasTecnicasComponent,
    FinancasComponent,
    FormFichaComponent,
    FornecedorComponent,
    GrupoFichasComponent,
    GrupoFinancasComponent,
    HomepageComponent,
    IngredientesComponent,
    LoginComponent,
    NotFoundComponent,
    NovaFinancaComponent,
    NovoGrupoComponent,
    OrdersComponent,
    PainelContadorComponent,
    StockControlComponent,
    UltimasTransacoesComponent,
} from '@presentation/view/pages';
import { ControleMesasComponent, DeliveryComponent, UltimosPedidosComponent } from '@presentation/view/pages/admin/orders';
import { TestComponent } from '@presentation/view/pages/shared/test/test.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },

    {
        path: 'admin/colaboradores/cadastrar-colaborador',
        component: CadastroColaboradorComponent,
    },

    {
        path: 'admin/controle-caixa/ultimas-transacoes',
        component: UltimasTransacoesComponent,
    },
    {
        path: 'admin/controle-caixa/financas/grupo-financas',
        component: GrupoFinancasComponent,
    },
    {
        path: 'admin/controle-caixa/financas',
        component: FinancasComponent,
    },
    {
        path: 'admin/controle-caixa/financas/nova-financa',
        component: NovaFinancaComponent,
    },
    { path: 'admin/controle-caixa', component: CashFlowComponent },

    { path: 'admin/colaboradores', component: ColaboradorComponent },
    { path: 'admin/estoque', component: StockControlComponent },

    {
        path: 'admin/estoque/fichas-tecnicas/grupo-fichas',
        component: GrupoFichasComponent,
    },
    {
        path: 'admin/estoque/fichas-tecnicas',
        component: FichasTecnicasComponent,
    },
    {
        path: 'admin/estoque/fichas-tecnicas/nova-ficha',
        component: FormFichaComponent,
    },
    {
        path: 'admin/estoque/fichas-tecnicas/novo-grupo',
        component: NovoGrupoComponent,
    },
    {
        path: 'admin/estoque/cadastrar-fornecedor',
        component: FornecedorComponent,
    },
    {
        path: 'admin/estoque/cadastrar-ingrediente',
        component: IngredientesComponent,
    },
    {
        path: 'admin/estoque/fornecedores',
        component: DashFornecedoresComponent,
    },
    {
        path: 'admin/estoque/ingredientes',
        component: DashIngredientesComponent,
    },
    {
        path: 'admin/controle-caixa/painel-contador',
        component: PainelContadorComponent,
    },
    {
        path: 'admin/pedidos',
        component: OrdersComponent,
    },
    {
        path: 'admin/pedidos/ultimos-pedidos',
        component: UltimosPedidosComponent,
    },
    {
        path: 'admin/pedidos/delivery',
        component: DeliveryComponent,
    },
    {
        path: 'admin/pedidos/controle-de-mesas',
        component: ControleMesasComponent
    },
    {
        path: 'teste',
        component: TestComponent,
    },

    { path: '**', component: NotFoundComponent },
];
