import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { State } from '../../../consts/interfaces/state.interface';
import { PhonePipe } from '../../../consts/pipes/phone.pipe';
import { Address } from '../../../consts/interfaces/user.interface';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, PhonePipe],
  templateUrl: './info-check.component.html',
  styleUrls: ['./info-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCheckComponent implements OnInit, OnDestroy {
  public state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);
  private subscription: Subscription = new Subscription();
  constructor(
    private stateManagerService: StateManagerService,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.stateManagerService.getData().subscribe((res) => {
        this.state.next(res);
      })
    );
    this.setProgressState();
  }

  public getAdress(adresses: Address[]) {
    const currentAdress = adresses.find((item) => item.type === 'CURRENT');
    return `${currentAdress?.streetAddress}, ${currentAdress?.city}, ${currentAdress?.state}, ${currentAdress?.zipCode}`;
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'info-check',
      primaryButton: {
        disabled: false,
        text: 'Continue',
        action: () => this.router.navigate(['/register/verification']),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () =>
          this.router.navigate(['/register/create-account/manually']),
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
