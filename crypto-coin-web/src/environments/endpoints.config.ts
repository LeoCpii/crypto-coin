import { Endpoints } from 'src/app/shared/endpoints';

export const endpoints = {
    auth: {
        login: new Endpoints('/security/signIn', false, '/security/signIn'),
        forgot: new Endpoints('/forgot', false, '/forgot'),
        register: new Endpoints('/security/create-user', false, '/security/create-user'),
    },
    monitor: {
        wallet: (email: string) => new Endpoints(`/user/${email}/wallet`, false, `/user/${email}/wallet`),
        coinDetail: (coinId: string) => new Endpoints(`/broker/coin/${coinId}`, false, `/broker/coin/${coinId}`),
    },
    broker: {
        list: new Endpoints('/broker/list', false, '/broker/list'), 
        detail: (id: string) => new Endpoints(`/broker/coin/${id}`, false, `/broker/coin/${id}`), 
    }
};
