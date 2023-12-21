import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  ProgressBarService,
  ProgressState,
} from './services/progress-bar.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('loadingAnimation', [
      state('loading', style({ opacity: 1, display: 'flex' })),
      state('stoped', style({ opacity: 0, display: 'none' })),
      transition('loading <=> stoped', animate('0.15s')),
    ]),
  ],
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  public progressState: BehaviorSubject<ProgressState> | undefined;
  public loaderState: Observable<boolean> | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private progressBarService: ProgressBarService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.progressState = new BehaviorSubject<ProgressState>({ display: false });
    this.loaderState = this.loaderService.getLoadingState();
    this.subscription.add(
      this.progressBarService.getState().subscribe((data) => {
        this.progressState?.next(data);
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public getNextMonthDate(): string {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    return currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
