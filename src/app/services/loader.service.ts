import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private isLoading: Subject<boolean> = new Subject();

  constructor() {}

  public setLoadingState(state: boolean) {
    this.isLoading.next(state);
  }

  public getLoadingState(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
