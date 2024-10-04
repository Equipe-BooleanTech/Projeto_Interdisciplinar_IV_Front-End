import { Routes } from '@angular/router';
import {
    CadastroColaboradorComponent,
    CashFlowComponent,
    ColaboradorComponent,
    DashboardComponent,
    FichasTecnicasComponent,
    FormFichaComponent,
    FornecedorComponent,
    GrupoFichasComponent,
    HomepageComponent,
    IngredientesComponent,
    LoginComponent,
    NotFoundComponent,
    OrdersComponent,
    PainelContadorComponent,
    ColaboradorComponent,
    StockControlComponent,
} from '@presentation/view/pages';



export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },

    { path: 'admin/controle-caixa', component: CashFlowComponent },
    {
        path: 'admin/controle-caixa/painel-contador',
        component: PainelContadorComponent,
    },
    { path: 'admin/colaboradores', component: ColaboradorComponent },
    { path: 'admin/estoque', component: StockControlComponent },
    {
        path: 'admin/estoque/fichas-tecnicas',
        component: FichasTecnicasComponent,
    },
    {
        path: 'admin/estoque/fichas-tecnicas/grupo-fichas',
        component: GrupoFichasComponent,
    },
    {
        path: 'admin/estoque/fichas-tecnicas/grupo-fichas/form-ficha',
        component: FormFichaComponent,
    },
    { path: 'admin/pedidos', component: OrdersComponent },
    { path: 'admin/colaboradores/cadastrar-colaborador', component: CadastroColaboradorComponent },
    { path: 'admin/controle-caixa', component: CashFlowComponent},
    { path: 'admin/controle-caixa/painel-contador', component: PainelContadorComponent },
    { path: 'admin/colaboradores', component: ColaboradorComponent},
    { path: 'admin/estoque', component: StockControlComponent },
    { path: 'admin/estoque/fichas-tecnicas', component: FichasTecnicasComponent },
    { path: 'admin/estoque/fichas-tecnicas/grupo-fichas', component: GrupoFichasComponent },
    { path: 'admin/estoque/fichas-tecnicas/grupo-fichas/form-ficha', component: FormFichaComponent  },
    { path: 'admin/estoque/cadastrar-fornecedor', component: FornecedorComponent},
    { path: 'admin/estoque/cadastrar-ingrediente', component: IngredientesComponent},
    { path: 'admin/pedidos', component: OrdersComponent},
    { path: '**', component: NotFoundComponent },
];
