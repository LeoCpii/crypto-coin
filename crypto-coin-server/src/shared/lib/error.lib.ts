import { Utils } from './utils.lib';

export interface IError {
    status: number;
    message: string | object | string[];
    redirect: boolean;
    origin?: string;
}

export class DbError {
    
}

export class HandlerError {
    private status: number;
    private message: string | object | string[];
    private redirect: boolean;
    private origin: string;

    constructor(status: number = 0, message: string | object | string[], redirect = false, origin?: string) {
        const utils = new Utils();
        this.message = this.msg(message);
        this.status = status;
        this.redirect = redirect;

        if(utils.isNoProd) {
            this.origin = origin || process.env.PROJECT_NAME;
        }
    }

    private msg(msg: string | object | string[]) {
        if (typeof msg === 'object') {
            if(msg['message'] && !msg['errors']) {
                return msg['message'];
            }
            const errors = [];
            for (const key in msg['errors']) {
                errors.push(msg['errors'][key].message);
            }
            return errors;
        }
        return msg;
    }
}