import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent implements OnInit {
  private JARoutes = JARoutes;
  private oneTimeToken: string;
  public apiErrors: ApiErrors = new ApiErrors([]);
  public displayErrorMessage: boolean;
  public loadingSubmit: boolean = false;
  public resetPasswordForm: FormGroup;

  constructor(
    private userProxy: UserProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchRouterParam();
  }

  private initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  private fetchRouterParam() {
    this.route.params.subscribe(params => {
      this.oneTimeToken = params['token'];
    });
  }

  submitForm(value: any) {
    this.loadingSubmit = true;
    this.displayErrorMessage = false;
    this.userProxy.changePasswordWithToken(value.password, this.oneTimeToken)
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset');
        this.loadingSubmit = false;
      })
      .catch((errors) => {
        this.apiErrors = errors;
        this.displayErrorMessage = true;
        this.loadingSubmit = false;
      });
  }

  onEnterKeyUp() {
    if (this.resetPasswordForm.valid) {
      this.submitForm(this.resetPasswordForm.value);
    }
  }
}
