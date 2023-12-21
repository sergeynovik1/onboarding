import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { State } from '../../../consts/interfaces/state.interface';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './link-verification-success.component.html',
  styleUrls: ['./link-verification-success.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkVerificationSuccessComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);

  constructor(
    private stateManagerService: StateManagerService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.stateManagerService
        .getData()
        .subscribe((res) => this.state.next(res))
    );
    if (this.state.value?.user) {
      this.subscription.add(
        this.authService.updateUser(this.state.value.user).subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
