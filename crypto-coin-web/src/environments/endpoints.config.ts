import { Endpoints } from 'src/app/shared/endpoints';

export const endpoints = {
    auth: {
        login: new Endpoints('/security/signIn', false, '/security/signIn'),
        forgot: new Endpoints('/forgot', false, '/forgot'),
        register: new Endpoints('/security/create-user', false, '/security/create-user'),
    },
    user: {
        info: new Endpoints('/user', false, '/user'),
        favoritesUpdate: new Endpoints('/user/favorite', false, '/user/favorite'),
        contribution: new Endpoints(`/user/wallet/contribution`, false, `/user/wallet/contribution`),
        add: new Endpoints('/user/wallet/add', false, '/user/wallet/add'),
        sale: new Endpoints('/user/wallet/sale', false, '/user/wallet/sale'),
    },
    monitor: {
        wallet: new Endpoints(`/user/wallet`, false, `/user/wallet`),
        coinDetail: (coinId: string) => new Endpoints(`/broker/coin/${coinId}`, false, `/broker/coin/${coinId}`),
    },
    broker: {
        list: new Endpoints('/broker/list', false, '/broker/list'),
        detail: (id: string) => new Endpoints(`/broker/coin/${id}`, false, `/broker/coin/${id}`),
        marketChart: (id: string, from: number, to: number) => new Endpoints(`/broker/coin/${id}/marketChart?from=${from}&to=${to}`, false, `/broker/coin/${id}/marketChart?from=${from}&to=${to}`),
    }
};
