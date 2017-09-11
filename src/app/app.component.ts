import {AlreadyRegisteredModalComponent} from './components/modals/already-registered-modal/already-registered-modal.component';
import {AppliedForJobModalComponent} from './components/modals/applied-for-job-modal/applied-for-job-modal.component';
import {ApplyForJobModalComponent} from './components/modals/apply-for-job-modal/apply-for-job-modal.component';
import {BaseComponent} from './components/base.component';
import {Component} from '@angular/core';
import {ContactMessageSentModalComponent} from './components/modals/contact-message-sent-modal/contact-message-sent-modal.component';
import {ForgotPasswordModalComponent} from './components/modals/forgot-password-modal/forgot-password-modal.component';
import {JobAdditionalUserInfoModalComponent} from './components/modals/job-additional-user-info-modal/job-additional-user-info-modal.component';
import {LoginModalComponent} from './components/modals/login-modal/login-modal.component';
import {LoginOrRegisterModalComponent} from './components/modals/login-or-register-modal/login-or-register-modal.component';
import {MissingPaymentInformationModalComponent} from './components/modals/missing-payment-information-modal/missing-payment-information-modal.component';
import {ModalService} from './services/modal.service';
import {PasswordChangedModalComponent} from './components/modals/password-changed-modal/password-changed-modal.component';
import {PasswordResetLinkSentModalComponent} from './components/modals/password-reset-link-sent-modal/password-reset-link-sent-modal.component';
import {RegisteredModalComponent} from './components/modals/registered-modal/registered-modal.component';
import {RegisterModalComponent} from './components/modals/register-modal/register-modal.component';
import {ShareModalComponent} from './components/modals/share-modal/share-modal.component';
import {SignedForJobModalComponent} from './components/modals/signed-for-job-modal/signed-for-job-modal.component';
import {SignForJobModalComponent} from './components/modals/sign-for-job-modal/sign-for-job-modal.component';
import {SubscribedModalComponent} from './components/modals/subscribed-modal/subscribed-modal.component';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from './resolvers/system-languages/system-languages.resolver';
import {TransferState} from './transfer-state/transfer-state';
import {UnsubscribedModalComponent} from './components/modals/unsubscribed-modal/unsubscribed-modal.component';
import {UpdateProfileStep1ModalComponent} from './components/modals/update-profile-step-1-modal/update-profile-step-1-modal.component';
import {UpdateProfileStep2ModalComponent} from './components/modals/update-profile-step-2-modal/update-profile-step-2-modal.component';
import {UpdateProfileStep3ModalComponent} from './components/modals/update-profile-step-3-modal/update-profile-step-3-modal.component';
import {UpdateProfileStep4ModalComponent} from './components/modals/update-profile-step-4-modal/update-profile-step-4-modal.component';
import {UserResolver} from './resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';
import {WelcomeStep1ModalComponent} from './components/modals/welcome-step-1-modal/welcome-step-1-modal.component';
import {WelcomeStep2ModalComponent} from './components/modals/welcome-step-2-modal/welcome-step-2-modal.component';
import {WelcomeStep3ModalComponent} from './components/modals/welcome-step-3-modal/welcome-step-3-modal.component';

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>

    <already-registered-modal
      (onLoggedIn)="modalResult($event)"
      [emailOrPhone]="args[0]"
      [navigateToHome]="navigate"
      *ngIf="shownModal === 'alreadyRegisteredModalComponent'"
      #alreadyRegisteredModalComponent>
    </already-registered-modal>

    <applied-for-job-modal
      *ngIf="shownModal === 'appliedForJobModalComponent'"
      #appliedForJobModalComponent>
    </applied-for-job-modal>

    <apply-for-job-modal
      (onAppliedForJob)="modalResult($event)"
      [job]="args[0]"
      *ngIf="shownModal === 'applyForJobModalComponent'"
      #applyForJobModalComponent>
    </apply-for-job-modal>

    <contact-message-sent-modal
      *ngIf="shownModal === 'contactMessageSentModalComponent'"
      #contactMessageSentModalComponent>
    </contact-message-sent-modal>

    <forgot-password-modal
      (onPasswordLinkSent)="modalResult($event)"
      *ngIf="shownModal === 'forgotPasswordModalComponent'"
      #forgotPasswordModalComponent>
    </forgot-password-modal>

    <job-additional-user-info-modal
      (onInformationSupplied)="modalResult($event)"
      [missingUserTraits]="args[0]"
      *ngIf="shownModal === 'jobAdditionalUserInfoModalComponent'"
      #jobAdditionalUserInfoModalComponent>
    </job-additional-user-info-modal>

    <login-modal
      (onLoggedIn)="modalResult($event)"
      [navigateToHome]="navigate"
      *ngIf="shownModal === 'loginModalComponent'"
      #loginModalComponent>
    </login-modal>

    <login-or-register-modal
      (onLoggedInOrRegistered)="modalResult($event)"
      *ngIf="shownModal === 'loginOrRegisterModalComponent'"
      #loginOrRegisterModalComponent>
    </login-or-register-modal>

    <missing-payment-information-modal
      (onInformationSupplied)="modalResult($event)"
      [missingUserTraits]="args[0]"
      *ngIf="shownModal === 'missingPaymentInformationModalComponent'"
      #missingPaymentInformationModalComponent>
    </missing-payment-information-modal>

    <password-changed-modal
      *ngIf="shownModal === 'passwordChangedModalComponent'"
      #passwordChangedModalComponent>
    </password-changed-modal>

    <password-reset-link-sent-modal
      *ngIf="shownModal === 'passwordResetLinkSentModalComponent'"
      #passwordResetLinkSentModalComponent>
    </password-reset-link-sent-modal>

    <register-modal
      (onRegistered)="modalResult($event)"
      [navigateToHome]="navigate"
      *ngIf="shownModal === 'registerModalComponent'"
      #registerModalComponent>
    </register-modal>

    <registered-modal
      *ngIf="shownModal === 'registeredModalComponent'"
      #registeredModalComponent>
    </registered-modal>

    <share-modal
      *ngIf="shownModal === 'shareModalComponent'"
      #shareModalComponent>
    </share-modal>

    <sign-for-job-modal
      (onSignedForJob)="modalResult($event)"
      [application]="args[0]"
      [job]="args[1]"
      *ngIf="shownModal === 'signForJobModalComponent'"
      #signForJobModalComponent>
    </sign-for-job-modal>

    <signed-for-job-modal
      *ngIf="shownModal === 'signedForJobModalComponent'"
      #signedForJobModalComponent>
    </signed-for-job-modal>

    <subscribed-modal
      *ngIf="shownModal === 'subscribedModalComponent'"
      #subscribedModalComponent>
    </subscribed-modal>

    <unsubscribed-modal
      *ngIf="shownModal === 'unsubscribedModalComponent'"
      #unsubscribedModalComponent>
    </unsubscribed-modal>

    <update-profile-step-1-modal
      *ngIf="shownModal === 'updateProfileStep1ModalComponent'"
      #updateProfileStep1ModalComponent>
    </update-profile-step-1-modal>

    <update-profile-step-2-modal
      *ngIf="shownModal === 'updateProfileStep2ModalComponent'"
      #updateProfileStep2ModalComponent>
    </update-profile-step-2-modal>

    <update-profile-step-3-modal
      *ngIf="shownModal === 'updateProfileStep3ModalComponent'"
      #updateProfileStep3ModalComponent>
    </update-profile-step-3-modal>

    <update-profile-step-4-modal
      *ngIf="shownModal === 'updateProfileStep4ModalComponent'"
      #updateProfileStep4ModalComponent>
    </update-profile-step-4-modal>

    <welcome-step-1-modal
      *ngIf="shownModal === 'welcomeStep1ModalComponent'"
      #welcomeStep1ModalComponent>
    </welcome-step-1-modal>

    <welcome-step-2-modal
      *ngIf="shownModal === 'welcomeStep2ModalComponent'"
      #welcomeStep2ModalComponent>
    </welcome-step-2-modal>

    <welcome-step-3-modal
      *ngIf="shownModal === 'welcomeStep3ModalComponent'"
      #welcomeStep3ModalComponent>
    </welcome-step-3-modal>
`
})
export class AppComponent extends BaseComponent {
  @ViewChild('alreadyRegisteredModalComponent') public alreadyRegisteredModalComponent: AlreadyRegisteredModalComponent;
  @ViewChild('appliedForJobModalComponent') public appliedForJobModalComponent: AppliedForJobModalComponent;
  @ViewChild('applyForJobModalComponent') public applyForJobModalComponent: ApplyForJobModalComponent;
  @ViewChild('contactMessageSentModalComponent') public contactMessageSentModalComponent: ContactMessageSentModalComponent;
  @ViewChild('forgotPasswordModalComponent') public forgotPasswordModalComponent: ForgotPasswordModalComponent;
  @ViewChild('jobAdditionalUserInfoModalComponent') public jobAdditionalUserInfoModalComponent: JobAdditionalUserInfoModalComponent;
  @ViewChild('loginModalComponent') public loginModalComponent: LoginModalComponent;
  @ViewChild('loginOrRegisterModalComponent') public loginOrRegisterModalComponent: LoginOrRegisterModalComponent;
  @ViewChild('missingPaymentInformationModalComponent') public missingPaymentInformationModalComponent: MissingPaymentInformationModalComponent;
  @ViewChild('passwordChangedModalComponent') public passwordChangedModalComponent: PasswordChangedModalComponent;
  @ViewChild('passwordResetLinkSentModalComponent') public passwordResetLinkSentModalComponent: PasswordResetLinkSentModalComponent;
  @ViewChild('registeredModalComponent') public registeredModalComponent: RegisteredModalComponent;
  @ViewChild('registerModalComponent') public registerModalComponent: RegisterModalComponent;
  @ViewChild('shareModalComponent') public shareModalComponent: ShareModalComponent;
  @ViewChild('signedForJobModalComponent') public signedForJobModalComponent: SignedForJobModalComponent;
  @ViewChild('signForJobModalComponent') public signForJobModalComponent: SignForJobModalComponent;
  @ViewChild('subscribedModalComponent') public subscribedModalComponent: SubscribedModalComponent;
  @ViewChild('unsubscribedModalComponent') public unsubscribedModalComponent: UnsubscribedModalComponent;
  @ViewChild('updateProfileStep1ModalComponent') public updateProfileStep1ModalComponent: UpdateProfileStep1ModalComponent;
  @ViewChild('updateProfileStep2ModalComponent') public updateProfileStep2ModalComponent: UpdateProfileStep2ModalComponent;
  @ViewChild('updateProfileStep3ModalComponent') public updateProfileStep3ModalComponent: UpdateProfileStep3ModalComponent;
  @ViewChild('updateProfileStep4ModalComponent') public updateProfileStep4ModalComponent: UpdateProfileStep4ModalComponent;
  @ViewChild('welcomeStep1ModalComponent') public welcomeStep1ModalComponent: WelcomeStep1ModalComponent;
  @ViewChild('welcomeStep2ModalComponent') public welcomeStep2ModalComponent: WelcomeStep2ModalComponent;
  @ViewChild('welcomeStep3ModalComponent') public welcomeStep3ModalComponent: WelcomeStep3ModalComponent;

  public args: any[] = [];
  public navigate: boolean;
  public shownModal: string;

  private showModalSubscription: Subscription;
  private hideModalSubscription: Subscription;

  public constructor(
    private cache: TransferState,
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }


  public onInit(): void {
    this.cache.set('cached', true);
    this.initShowModalSubscription();
    this.initHideModalSubscription();
  }

  private initShowModalSubscription(): void {
    this.showModalSubscription = this.modalService.getShowModalEmitter().subscribe(obj => {
      if (this[this.shownModal]) {
        this[this.shownModal].hide();
      }

      setTimeout(() => {
        this.navigate = obj.navigate;
        this.args = obj.args;
        this.shownModal = obj.modal;
        setTimeout(() => {
          this[obj.modal].show();
        }, 1);
      }, obj.delay);
    });
  }

  private initHideModalSubscription(): void {
    this.hideModalSubscription = this.modalService.getHideModalEmitter().subscribe(obj => {
      if (this[obj.modal]) {
        this[obj.modal].hide();
      }
    });
  }

  public onDestroy(): void {
    if (this.hideModalSubscription) { this.hideModalSubscription.unsubscribe(); }
    if (this.showModalSubscription) { this.showModalSubscription.unsubscribe(); }
  }

  public modalResult(result: any): void {
    this.modalService.modalResult(result);
  }
}
