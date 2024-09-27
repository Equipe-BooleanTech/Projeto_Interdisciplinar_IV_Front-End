import { Routes } from '@angular/router';
import {
    DashboardComponent,
    HomepageComponent,
    LoginComponent,
    NotFoundComponent,
} from '@presentation/view/pages';
import { PainelContadorComponent } from '@presentation/view/pages/admin/cash-flow/painel-contador/painel-contador.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },
    { path: 'admin/controle-caixa/painel-contador', component: PainelContadorComponent},
    { path: '**', component: NotFoundComponent }, 
];