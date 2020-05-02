import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, SignupFormComponent, LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
