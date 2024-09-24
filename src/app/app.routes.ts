import { Routes } from '@angular/router';
import { HomepageComponent } from '@presentation/view/pages';
import { LoginComponent } from '@presentation/view/pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
];
