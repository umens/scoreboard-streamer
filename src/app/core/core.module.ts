import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { ShellComponent } from './shell/shell.component';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderComponent } from './shell/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NotificationService } from './services/notification.service';

import { SharedModule } from '../shared';
import { AuthenticationModule } from './authentication/authentication.module';

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { SimpleNotificationsModule, SimpleNotificationsComponent } from 'angular2-notifications';

@NgModule({
  declarations: [ShellComponent, FooterComponent, HeaderComponent, NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationModule,
    RouterModule,
    McBreadcrumbsModule.forRoot(),
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SimpleNotificationsComponent
  ],
  providers: [
    NotificationService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
