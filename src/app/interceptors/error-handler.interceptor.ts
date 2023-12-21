import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { SnackBarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackbarService: SnackBarService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((response) => {
        if (response instanceof HttpResponse && !response.body?.api_success) {
          const message =
            (response.body?.message || response.body?.error) ??
            'Something went wrong';
          this.snackbarService.showError(message);
        }
      }),
      catchError((err) => {
        this.snackbarService.showError(
          (err.error.data.message || err.error) ?? 'Something went wrong'
        );
        this.router.navigate(['/register/failed']);
        throw err;
      })
    );
  }
}
