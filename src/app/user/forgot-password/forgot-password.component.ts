import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [NGXLogger]
})
export class ForgotPasswordComponent {

  error: Error = null;
  forgotPasswordForm: FormGroup;
  isLoading: boolean = false;
  mailSend: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private logger: NGXLogger
  ) {
    this.createForm();
  }

  forgot(): void {
    this.error = null;
    this.isLoading = true;
    // this.authenticationService.forgotPassord(this.forgotPasswordForm.value)
    //   .pipe(finalize(() => {
    //     this.forgotPasswordForm.markAsPristine();
    //     this.isLoading = false;
    //   }))
    //   .subscribe(() => {
    //     this.logger.debug(`Email send`);
    //     this.mailSend = true;
    //     setTimeout(() => {
    //       this.router.navigate(['/login'], { replaceUrl: true });
    //     }, 10000);
    //   }, error => {
    //     this.logger.error(`Password reset error: ${error}`);
    //     this.error = error.error;
    //   });
  }

  private createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
