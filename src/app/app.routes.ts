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
    HomepageComponent,
    IngredientesComponent,
    LoginComponent,
    NotFoundComponent,
    NovaFinancaComponent,
    StockControlComponent,
    UltimasTransacoesComponent,
} from '@presentation/view/pages';
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
        path: 'admin/estoque/fichas-tecnicas/grupo-fichas/form-ficha',
        component: FormFichaComponent,
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
        path: 'teste',
        component: TestComponent,
    },

    { path: '**', component: NotFoundComponent },
];
