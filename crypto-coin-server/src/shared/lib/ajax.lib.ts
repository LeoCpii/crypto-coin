import axios, { AxiosRequestConfig } from 'axios';
import { HandlerError } from './error.lib';

export type AjaxOptions = AxiosRequestConfig;

interface IResponse<T> {
    data: T;
    status: number;
}

export class Ajax {
    public async get<T>(url: string, options?: AjaxOptions): Promise<IResponse<T>> {
        const opts = options || {};
        opts['method'] = 'GET';
        return await this.send(url, options);
    }
    public async post<T>(url: string, options?: AjaxOptions): Promise<IResponse<T>> {
        const opts = options || {};
        opts['method'] = 'POST';
        return await this.send(url, options);
    }
    public async put<T>(url: string, options?: AjaxOptions): Promise<IResponse<T>> {
        const opts = options || {};
        opts['method'] = 'PUT';
        return await this.send(url, options);
    }
    public async delete<T>(url: string, options?: AjaxOptions): Promise<IResponse<T>> {
        const opts = options || {};
        opts['method'] = 'DELETE';
        return await this.send(url, options);
    }

    private formatUrl(url: string) {
        const baseURL = process.env.API_URL;
        const isAbsoluteUrl = /^http/.test(url);
        return isAbsoluteUrl ? url : `${baseURL}${url}`;
    }

    private async send<T>(url: string, options: AjaxOptions): Promise<IResponse<T>> {
        url = this.formatUrl(url);

        return axios({ url, ...options })
            .then(res => ({
                data: res.data,
                status: res.status
            }))
            .catch(e => {
                if (Number(e.response.status) === 500) {
                    throw new HandlerError(
                        e.response.status,
                        e.response.data || e.response,
                        false,
                        e.response.data ? e.response.data.origin : '');
                }

                return {
                    data: e.response.data || e.response,
                    status: e.response.status as number
                };
            })
    }
}