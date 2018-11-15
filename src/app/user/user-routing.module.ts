import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { Route } from '../core/services/route.service';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ PublicGuard ],
    data: {
      title: 'Login'
    }
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [ PublicGuard ],
    data: {
      title: 'Create Account'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ PublicGuard ],
    data: {
      title: 'Forgot Password'
    }
  },
  Route.withShell([
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [ ProtectedGuard ],
      data: {
        title: 'Profile'
      }
    }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
