import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  constructor(private localStorageService: LocalStorageService) { }

  public get xAccessToken() {
    const auth = this.localStorageService.getJson('token');
    return auth || '';
  }
}
