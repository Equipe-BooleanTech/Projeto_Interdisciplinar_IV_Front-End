import { Routes } from '@angular/router';
import {
    CashFlowComponent,
    DashboardComponent,
    HomepageComponent,
    LoginComponent,
    NotFoundComponent,
    PainelContadorComponent,
    ColaboradorComponent,
    FichasTecnicasComponent,
    GrupoFichasComponent,
    FormFichaComponent,
} from '@presentation/view/pages';



export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },
    
    {
        path: 'admin/controle-caixa',
        component: CashFlowComponent,
    },
    {
        path: 'admin/controle-caixa/painel-contador',
        component: PainelContadorComponent,
    },
    {
        path: 'admin/colaboradores',
        component: ColaboradorComponent,
    },
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

    { path: '**', component: NotFoundComponent },
];
