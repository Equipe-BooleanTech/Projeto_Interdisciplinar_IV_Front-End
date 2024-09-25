import { Routes } from '@angular/router';
import {
    DashboardComponent,
    HomepageComponent,
    NotFoundComponent,
} from '@presentation/view/pages';
import { LoginComponent } from '@presentation/view/pages';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DashboardComponent },
    { path: '**', component: NotFoundComponent }, 
];