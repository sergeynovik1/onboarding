import { StorageService } from './../../../../services/storage.service';
import { State } from './../../consts/interfaces/state.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StateEntities } from '../../consts/types/state-entities.type';

@Injectable({ providedIn: 'root' })
export class StateManagerService {
  private state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);
  private stateKey: string = 'onboarding-state';

  constructor(private storageService: StorageService) {}

  public getData(): BehaviorSubject<State | null> {
    const storageData = this.storageService.get(this.stateKey);
    if (storageData) {
      this.state.next(JSON.parse(storageData));
    }
    return this.state;
  }

  public setData(key: StateEntities, data: State[StateEntities] | null): void {
    const updatedData: State = {
      ...this.state.value,
      [key]: data,
    };
    this.storageService.set(this.stateKey, JSON.stringify(updatedData));
    this.state.next(updatedData);
  }
}
