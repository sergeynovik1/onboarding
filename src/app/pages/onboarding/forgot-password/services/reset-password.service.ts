import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

interface ResetPasswordState {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  private resetPasswordState: BehaviorSubject<ResetPasswordState | null> =
    new BehaviorSubject<ResetPasswordState | null>(null);
  constructor(private httpClient: HttpClient) {}

  public getState(): ResetPasswordState | null {
    return this.resetPasswordState.value;
  }

  public setState(data: ResetPasswordState): void {
    this.resetPasswordState.next(data);
  }

  public sendResendPassword(data: ResetPasswordState): Observable<any> {
    return of([]).pipe(tap(() => this.resetPasswordState.next(data)));
  }

  public changePassword(data: any): Observable<any> {
    return of([]);
  }
}
