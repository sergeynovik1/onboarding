import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CountdownComponent,
  CountdownModule,
  CountdownConfig,
} from 'ngx-countdown';

@Component({
  selector: 'app-timer[endTimestamp]',
  standalone: true,
  imports: [CommonModule, CountdownModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  animations: [
    trigger('countdown', [
      state('start', style({ 'stroke-dashoffset': '0px', display: 'block' })),
      state(
        'end',
        style({
          'stroke-dashoffset': 'calc(calc(50% - 1px) * 3.14 * 2)',
          display: 'none',
        })
      ),
      transition('* => end', [animate('{{ duration }}')], {
        params: { duration: '1s' },
      }),
    ]),
  ],
})
export class TimerComponent implements OnInit, OnChanges {
  @Input()
  public endTimestamp!: number;
  @Output()
  public timerExpired: EventEmitter<void> = new EventEmitter();
  public countdownConfig: CountdownConfig | undefined;
  public animationState: 'start' | 'end' | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endTimestamp']) {
      this.animationState = 'start';
      this.animationState = 'end';
      const leftTime = Math.floor((this.endTimestamp - Date.now()) / 1000);
      this.countdownConfig = {
        leftTime: leftTime > 0 ? leftTime : 0,
        format: 'm:ss',
      };
    }
  }

  public onAnimationEnd(progressRef: HTMLElement) {
    this.animationState = 'start';
    this.timerExpired.emit();
  }
}
