import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { ShellComponent } from './shell/shell.component';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderComponent } from './shell/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NotificationService } from './services/notification.service';

import { SharedModule } from '../shared';

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { SimpleNotificationsModule, SimpleNotificationsComponent } from 'angular2-notifications';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { HttpService } from './http/http.service';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { TokenInterceptor } from './http/token.interceptor';

@NgModule({
  declarations: [ShellComponent, FooterComponent, HeaderComponent, NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    McBreadcrumbsModule.forRoot(),
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SimpleNotificationsComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificationService,
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
