import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { NotificationType, Notification } from '../../models';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NGXLogger]
})
export class LoginComponent {

  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private logger: NGXLogger
  ) {
    this.createForm();
  }

  login(): void {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        this.logger.debug(`${credentials.firstname} ${credentials.lastname} successfully logged in`);
        const notification: Notification = new Notification({
          title: 'Logged In',
          content: `Hey ${credentials.firstname} ${credentials.lastname}`,
          type: NotificationType.SUCCESS
        });
        this.notificationService.showNotification(notification);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/home';
        // Redirect the user
        this.router.navigate([redirect]);
        // this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        // this.logger.error(`Login error: ${error}`);
        this.logger.error('Login error', error);
        this.error = error;
      });
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
