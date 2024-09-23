import { Component, OnInit } from '@angular/core';
import { LoginFormLayoutComponent } from '@presentation/view/layouts/login-form-layout/login-form-layout.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [LoginFormLayoutComponent], standalone: true
})
export class LoginComponent implements OnInit {
  

  ngOnInit() {
    
  }

  
}
