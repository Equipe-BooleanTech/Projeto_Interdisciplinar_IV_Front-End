import { Routes } from '@angular/router';
import {
    DashboardComponent,
    HomepageComponent,
    LoginComponent,
    NotFoundComponent,
    PainelContadorComponent,
} from '@presentation/view/pages';
import { ComponentsLayoutComponent } from '@presentation/view/pages/components-layout/components-layout.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },
    {
        path: 'admin/controle-caixa/painel-contador',
        component: PainelContadorComponent,
    },
    { path: 'teste', component: ComponentsLayoutComponent },
    { path: '**', component: NotFoundComponent },
];
