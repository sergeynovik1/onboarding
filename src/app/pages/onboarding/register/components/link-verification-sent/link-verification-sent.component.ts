import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TimerComponent } from '../../../components/timer/timer.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SmfaVerificationService } from '../../../services/smfa-verification.service';
import { PhonePipe } from '../../../consts/pipes/phone.pipe';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { State } from '../../../consts/interfaces/state.interface';
import { SmfaVerificationResponse } from '../../../consts/interfaces/responses/smfa-verification-response.interface';

@Component({
  templateUrl: './link-verification-sent.component.html',
  styleUrls: ['./link-verification-sent.component.scss'],
  standalone: true,
  imports: [CommonModule, TimerComponent, PhonePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkVerificationSentComponent implements OnInit, OnDestroy {
  public state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);
  private socketConnection: Observable<SmfaVerificationResponse> | undefined;
  private subscription: Subscription | undefined;
  constructor(
    private smfaVerificationService: SmfaVerificationService,
    private authService: AuthService,
    private stateManagerService: StateManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.socketConnection =
      this.smfaVerificationService.getSmfaVerificationStream();

    this.subscription.add(
      this.stateManagerService.getData().subscribe((data: State | null) => {
        console.log(data);
        this.state.next(data);
      })
    );

    this.subscription.add(
      this.socketConnection?.subscribe((res) => this.parseSockerResponse(res))
    );
  }

  public onResendClick(button: HTMLButtonElement): void {
    button.disabled = true;
    this.subscription?.add(
      this.authService.resendSmfa().subscribe((res) => {
        this.stateManagerService.setData('smfaVerification', {
          expire: Date.now() + 240 * 1000,
          resendCount: 1,
          verified: false,
        });
      })
    );
  }

  public onTimerExpired(button: HTMLButtonElement): void {
    if (
      this.state.value &&
      this.state.value.smfaVerification &&
      this.state.value.smfaVerification.resendCount !== null &&
      this.state.value.smfaVerification.expire
    ) {
      button.disabled =
        Math.floor(this.state.value.smfaVerification.expire - Date.now()) < 0 &&
        this.state.value.smfaVerification.resendCount >= 1;
    }
  }

  private parseSockerResponse(response: SmfaVerificationResponse) {
    console.log(response);
    switch (response.status) {
      case 'error':
        this.stateManagerService.setData('smfaVerification', null);
        this.router.navigate(['/register/create-account/manually']);
        break;
      case 'success':
        if (this.state.value && response.data && this.state.value.user?.id) {
          this.stateManagerService.setData('smfaVerification', {
            resendCount: 0,
            expire: null,
            verified: true,
          });
          const { id, ...user } = response.data;
          this.stateManagerService.setData('user', {
            id: this.state.value.user?.id,
            ...user,
          });
        }
        this.router.navigate(['/register/link-verification/success']);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
