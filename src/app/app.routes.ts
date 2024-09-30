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
    { path: 'teste', component: ComponentsLayoutComponent },
    { path: '**', component: NotFoundComponent },
];
