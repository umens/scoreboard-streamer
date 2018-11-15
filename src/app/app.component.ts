import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NotificationsService, Options as NotificationDisplayOptions, NotificationAnimationType } from 'angular2-notifications';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { environment } from '../environments/environment';
import { NotificationService } from './core/services/notification.service';
import { NotificationType, Notification } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NGXLogger]
})
export class AppComponent implements OnInit {

  options: NotificationDisplayOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: NotificationAnimationType.Scale,
    position: ['bottom', 'right']
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _service: NotificationsService,
    private notificationService: NotificationService,
    private logger: NGXLogger
  ) {
    this.notificationService.notification$.subscribe((notification: Notification) => {
      this.showNotification(notification);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).pop(); // .join(' - ');
        this.titleService.setTitle(title);
      }
    });

   }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      this.logger.updateConfig({ level: NgxLoggerLevel.WARN });
    }

    this.logger.debug('init');
    this.logger.debug('Multiple', 'Argument', 'support');
  }

  showNotification(notification: Notification): void {
    switch (notification.type) {
      case NotificationType.SUCCESS:
        this._service.success(notification.title, notification.content, notification.override);
        break;
      case NotificationType.ALERT:
        this._service.alert(notification.title, notification.content, notification.override);
        break;
      case NotificationType.ERROR:
        this._service.error(notification.title, notification.content, notification.override);
        break;
      case NotificationType.INFO:
        this._service.info(notification.title, notification.content, notification.override);
        break;
      case NotificationType.BARE:
        this._service.bare(notification.title, notification.content, notification.override);
        break;
      case NotificationType.WARN:
        this._service.warn(notification.title, notification.content, notification.override);
        break;
    }
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

}
