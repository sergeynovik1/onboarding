import { StorageService } from 'src/app/services/storage.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const credentials = this.storageService.getTokens();
    if (!!credentials) {
      const newRequest = this.addToken(credentials.access, req);
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }
  }

  private addToken(token: string, request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('authorization', `Bearer ${token}`),
    });
  }
}
