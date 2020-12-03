interface ISecurityRegister {
    name: string;
    email: string;
}

interface IJWT {
    id: string;
    email: string;
    name: string;
}

interface IUser {
    favorites: Array<{ name: string; id: string }>;
    name: string;
    email: string;
}

interface IWallet {
    id: string;
    account: number;
    valuation: number;
    coins: Array<ICoin>
}

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    quota: number;
}

interface ICoinDetail {
    id: string;
    symbol: string;
    name: string;
    description: string;
    links: {
        homepage: string;
        twitter: string;
        facebook: string;
        reddit: string;
        github: string;
    },
    image: {
        thumb: string;
        small: string;
        large: string;
    },
    market_data: {
        rank: number;
        price: {
            brl: number;
            usd: number;
        },
        market_cap: {
            brl: number;
            usd: number;
        },
        volume: {
            brl: number;
            usd: number;
        },
        high_24h: {
            brl: number;
            usd: number;
        },
        low_24h: {
            brl: number;
            usd: number;
        }
    }
}

interface IList {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    },
    market: {
        rank: number;
        changePercent24h: number;
        price: {
            brl: number;
            usd: number;
        },
        market_cap: {
            brl: number;
            usd: number;
        }
    }
}

interface ICoinDetailFull {
    id: string;
    symbol: string;
    name: string;
    description: string;
    links: {
        homepage: string;
        twitter: string;
        facebook: string;
        reddit: string;
        github: string;
    },
    image: {
        thumb: string;
        small: string;
        large: string;
    },
    market_data: {
        rank: number;
        price: {
            brl: number;
            usd: number;
        },
        market_cap: {
            brl: number;
            usd: number;
        },
        volume: {
            brl: number;
            usd: number;
        },
        high_24h: {
            brl: number;
            usd: number;
        },
        low_24h: {
            brl: number;
            usd: number;
        }
    }
}

interface IMarketChart {
    prices: Array<number>[];
    total_volumes: Array<number>[];
}

interface IPay {
    coin: {
        id: string;
        symbol: string;
        name: string;
        quota: number;
    },
    value: number;
}