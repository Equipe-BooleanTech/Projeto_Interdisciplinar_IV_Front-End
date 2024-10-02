import { Routes } from '@angular/router';
import {
    CashFlowComponent,
    ColaboradorComponent,
    DashboardComponent,
    FichasTecnicasComponent,
    FormFichaComponent,
    GrupoFichasComponent,
    HomepageComponent,
    LoginComponent,
    NotFoundComponent,
    OrdersComponent,
    PainelContadorComponent,
    StockControlComponent,
} from '@presentation/view/pages';



export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },
    
    { path: 'admin/controle-caixa', component: CashFlowComponent},
    { path: 'admin/controle-caixa/painel-contador', component: PainelContadorComponent },
    { path: 'admin/colaboradores', component: ColaboradorComponent},
    { path: 'admin/estoque', component: StockControlComponent },
    { path: 'admin/estoque/fichas-tecnicas', component: FichasTecnicasComponent },
    { path: 'admin/estoque/fichas-tecnicas/grupo-fichas', component: GrupoFichasComponent },
    { path: 'admin/estoque/fichas-tecnicas/grupo-fichas/form-ficha', component: FormFichaComponent  },
    { path: 'admin/pedidos', component: OrdersComponent},

   

    { path: '**', component: NotFoundComponent },
];
