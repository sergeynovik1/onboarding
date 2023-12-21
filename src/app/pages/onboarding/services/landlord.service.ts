import { StorageService } from 'src/app/services/storage.service';
import { CookiesService } from './../../../services/cookies.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StateManagerService } from './state-managment/state-manager.service';

@Injectable({ providedIn: 'root' })
export class LandlordService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
    private stateManagerService: StateManagerService,
    private storageService: StorageService
  ) {}

  public sendLandlordInfo(payload: any[]): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/landlord`, payload).pipe(
      tap((res) => {
        const tokens = this.storageService.getTokens();
        this.cookiesService.setCookie('tokens', JSON.stringify(tokens));
      }),
      tap((res) => {
        const user = this.stateManagerService.getData().value?.user;
        this.cookiesService.setCookie('user', JSON.stringify(user));
      })
    );
  }
}
