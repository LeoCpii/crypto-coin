import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { tap } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private local: LocalStorageService,
    private security: SecurityService,
    private router: Router
  ) { }

  public async handleError(err: HttpErrorResponse, url: string) {
    const token = this.local.getJson('token');
    this.local.has('token');
    if (token && (err.status === 401 || err.status === 403)) {
      alert('Sua sessão expirou!');
      this.security.logout();
      return;
    }

    if (err.status === 500) {
      this.router.navigate(['error', '500']);
      return;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((ev: HttpEvent<any>) => { }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.handleError(err, request.url);
        }
      })
    );
  }
}
