
import * as _sentry from '@sentry/node';

export class Sentry {
    get dsn() {
        return process.env.SENTRY_DSN;
    }

    public init() {
        _sentry.init({ dsn: this.dsn })
    }

    public exception(err: any) {
        _sentry.captureException(err)
    }
}