import admin, { AppOptions } from "firebase-admin";
import { Utils } from './utils.lib';

interface IResponse { data: string };

export class Firebase {
    private static MESSAGE_ERROR = {
        'auth/wrong-password': {
            message: 'Email ou senha inválidos',
            status: 422
        },
        'auth/argument-error': {
            message: 'Requisição inválida',
            status: 428
        },
        'auth/user-not-found': {
            message: 'Usuário não encontrado',
            status: 428
        },
    }

    private config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DBURL,
        projectId: process.env.PID,
        storageBucket: process.env.BUCKET,
        messagingSenderId: process.env.MSGID
    }

    private get credentials(): AppOptions {
        return this.config;
    }

    public init() {
        admin.initializeApp(this.credentials);
    }

    public async user(email: string): Promise<IResponse> {
        try {
            const auth = await admin.auth().getUserByEmail(email);
            return { data: auth.uid };
        } catch (err) {
            const data = this.error(err);
            return { data: data.message }
        }
    }

    private error(err: { code: string, message: string }): { message: string; status: number } {
        const utils = new Utils();
        return Firebase.MESSAGE_ERROR[err.code] || {
            message: utils.isNoProd ? err.message : 'Oops, algo deu errado, tente novamente mais tarde.',
            status: 500
        };
    }
}