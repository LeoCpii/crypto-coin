import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from './current-user.service';

@Injectable({ providedIn: 'root' })
export class AjaxService {
  constructor(
    private http: HttpClient,
    public current: CurrentUserService,
  ) { }

  public async get<T>(
    url: string,
    params: { [param: string]: string | string[] } = {},
  ) {

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${this.current.xAccessToken}`
    };

    return this.http.get<T>(url, { params, headers }).toPromise();
  }

  public async post<T>(url: string, body: any = {}, notAuth: boolean = false, auth: string = '') {
    const options = {
      headers: notAuth ? {
        'Content-Type': 'application/json; charset=UTF-8'
      } : {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-access-token': `${auth || this.current.xAccessToken}`
        }
    };

    return this.http.post<T>(url, body, options).toPromise();
  }

  public async put<T>(url: string, body: any = {}, auth: string = '') {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-access-token': `${auth || this.current.xAccessToken}`
      }
    };

    return this.http.put<T>(url, body, options).toPromise();
  }

  public async delete<T>(url: string) {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-access-token': `${this.current.xAccessToken}`
      }
    };

    return this.http.delete<T>(url, options).toPromise();
  }
}
