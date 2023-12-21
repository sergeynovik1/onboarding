import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  public setCookie(name: string, data: string) {
    this.cookieService.set(
      name,
      data,
      undefined,
      '/',
      environment.appCoreDomain,
      true
    );
  }
}
