import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../consts/interfaces/response.interface';
import { SubscriptionsList } from '../consts/interfaces/responses/subscrptions-list.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getPlans(plan: string = ''): Observable<Response<SubscriptionsList>> {
    return this.httpClient.get<Response<SubscriptionsList>>(
      this.apiUrl + `/subscriptions?internalId=${plan}`
    );
  }

  public updatePaymentMode(payload: any) {
    return this.httpClient.post(
      this.apiUrl + `/subscriptions/update-payment-mode`,
      payload
    );
  }

  public subscribePackage(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + `/subscriptions/subscribe`, data);
  }
}
