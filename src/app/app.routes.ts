import { Routes } from '@angular/router';
import {
    CashFlowComponent,
    DashboardComponent,
    HomepageComponent,
    LoginComponent,
    NotFoundComponent,
    PainelContadorComponent,
} from '@presentation/view/pages';
import { ColaboradorComponent } from '@presentation/view/pages/admin/dashboard/colaborador/colaborador.component';
import { FichasTecnicasComponent } from '@presentation/view/pages/admin/stock-control/fichas-tecnicas/fichas-tecnicas.component';
import { FormFichaComponent } from '@presentation/view/pages/admin/stock-control/fichas-tecnicas/grupo-fichas/form-ficha/form-ficha.component';
import { GrupoFichasComponent } from '@presentation/view/pages/admin/stock-control/fichas-tecnicas/grupo-fichas/grupo-fichas.component';
import { ComponentsLayoutComponent } from '@presentation/view/pages/components-layout/components-layout.component';

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
        path: 'admin/colaborador',
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

    { path: 'teste', component: ComponentsLayoutComponent },
    { path: '**', component: NotFoundComponent },
];
