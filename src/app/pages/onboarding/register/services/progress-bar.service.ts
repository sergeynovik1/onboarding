import { Injectable } from '@angular/core';
import { Observable, Subject, share } from 'rxjs';

export interface ProgressButton {
  disabled: boolean;
  text: string;
  action: () => void;
}

export interface ProgressState {
  display: boolean;
  activeStep?: string;
  primaryButton?: ProgressButton;
  secondaryButton?: ProgressButton;
}

@Injectable({ providedIn: 'root' })
export class ProgressBarService {
  private progressState: Subject<ProgressState> = new Subject<ProgressState>();

  constructor() {}

  public getState(): Observable<ProgressState> {
    return this.progressState.asObservable().pipe(share());
  }

  public setState(data: ProgressState): void {
    this.progressState.next({ ...data });
  }
}
