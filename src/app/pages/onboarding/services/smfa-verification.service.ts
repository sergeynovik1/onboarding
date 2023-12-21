import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { SmfaVerificationResponse } from '../consts/interfaces/responses/smfa-verification-response.interface';

@Injectable({ providedIn: 'root' })
export class SmfaVerificationService {
  private sockerUrl = environment.socketUrl;
  private socketSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private storageService: StorageService) {}

  public getSmfaVerificationStream(): Observable<SmfaVerificationResponse> {
    const accessToken = this.storageService.getTokens()?.access;
    const socket = io(`${this.sockerUrl}?accessToken=${accessToken}`);
    return new Observable((observer) => {
      socket.on(
        'smfa-verification-completed',
        (data: SmfaVerificationResponse) => observer.next(data)
      );
      return () => {
        socket.disconnect();
      };
    });
  }
}
