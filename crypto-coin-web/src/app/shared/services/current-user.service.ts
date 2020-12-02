import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private _user: IUser;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  public get xAccessToken() {
    const auth = this.localStorageService.getJson('token');
    return auth || '';
  }

  public get user(): IUser {
    return this._user;
  }

  public setUser(user: IUser): void {
    this._user = user;
  }
}
