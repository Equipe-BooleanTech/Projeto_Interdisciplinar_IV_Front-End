import { Routes } from '@angular/router';
import {
    CadastroColaboradorComponent,
    CashFlowComponent,
    ColaboradorComponent,
    ControleMesasComponent,
    DashboardComponent,
    DashFornecedoresComponent,
    DashIngredientesComponent,
    DeliveryComponent,
    FichasTecnicasComponent,
    FinancasComponent,
    FormFichaComponent,
    FornecedorComponent,
    GrupoFichasComponent,
    GrupoFinancasComponent,
    HomepageComponent,
    IngredientesComponent,
    LoginComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
    NovaFinancaComponent,
    NovoGrupoComponent,
    OrdersComponent,
    PainelContadorComponent,
    QuestionsComponent,
    StockControlComponent,
    UltimasTransacoesComponent,
    UltimosPedidosComponent,
} from '@presentation/view/pages';

import { ForgotPasswordComponent } from '@presentation/view/pages/shared/login/forgot-password/forgot-password.component';
import { SatisfactionComponent } from '@presentation/view/pages/shared/satisfaction/satisfaction.component';
import { SecurityGuard } from './security';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        
    },
    {
        path: 'admin/satisfaction',
        component: SatisfactionComponent,
    },
    {
        path: 'admin/questions',
        component: QuestionsComponent,
    },

    {
        path: 'admin/colaboradores/cadastrar-colaborador',
        component: CadastroColaboradorComponent,
        canActivate: [SecurityGuard],
    },

    {
        path: 'admin/controle-caixa/ultimas-transacoes',
        component: UltimasTransacoesComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/controle-caixa/financas/grupo-financas',
        component: GrupoFinancasComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/controle-caixa/financas',
        component: FinancasComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/controle-caixa/financas/nova-financa',
        component: NovaFinancaComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/controle-caixa',
        component: CashFlowComponent,
        canActivate: [SecurityGuard],
    },

    {
        path: 'admin/colaboradores',
        component: ColaboradorComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque',
        component: StockControlComponent,
        canActivate: [SecurityGuard],
    },

    {
        path: 'admin/estoque/fichas-tecnicas/grupo-fichas',
        component: GrupoFichasComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/fichas-tecnicas',
        component: FichasTecnicasComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/fichas-tecnicas/nova-ficha',
        component: FormFichaComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/fichas-tecnicas/novo-grupo',
        component: NovoGrupoComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/cadastrar-fornecedor',
        component: FornecedorComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/cadastrar-ingrediente',
        component: IngredientesComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/fornecedores',
        component: DashFornecedoresComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/estoque/ingredientes',
        component: DashIngredientesComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/controle-caixa/painel-contador',
        component: PainelContadorComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/pedidos',
        component: OrdersComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/pedidos/ultimos-pedidos',
        component: UltimosPedidosComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/pedidos/delivery',
        component: DeliveryComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/pedidos/controle-de-mesas',
        component: ControleMesasComponent,
        canActivate: [SecurityGuard],
    },
    {
        path: 'admin/nao-autorizado',
        component: NotAuthorizedComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];