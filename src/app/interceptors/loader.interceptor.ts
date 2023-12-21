import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.setLoadingState(true);
    return next.handle(request).pipe(
      finalize(() => this.loaderService.setLoadingState(false)),
      catchError((err) => {
        this.loaderService.setLoadingState(false);
        throw err;
      })
    );
  }
}
