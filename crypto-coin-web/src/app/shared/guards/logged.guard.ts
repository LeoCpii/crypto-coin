import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { SecurityService } from '../services/security.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    private security: SecurityService,
    private localStorage: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const accessToken = this.localStorage.getJson('token');

      if (!accessToken) {
        alert('Efetue login para acessar a aplicação.');
        this.security.logout();
        resolve(false);
        return false;
      }

      resolve(true);
    });
  }
}
