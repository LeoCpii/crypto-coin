export interface ICoinSimpleDetail {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    },
    market_data: {
        market_cap_rank: number;
        price_change_percentage_24h_in_currency: {
            brl: number;
            usd: number;
        },
        current_price: {
            brl: number;
            usd: number;
        },
        market_cap: {
            brl: number;
            usd: number;
        }
    }
}

export interface ICoinDetail {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    links: {
        homepage: string[];
        twitter_screen_name: string;
        facebook_username: string;
        subreddit_url: string;
        repos_url: {
            github: string[];
        }
    },
    image: {
        thumb: string;
        small: string;
        large: string;
    },
    market_data: {
        market_cap_rank: number;
        current_price: {
            brl: number;
            usd: number;
        },
        market_cap: {
            brl: number;
            usd: number;
        },
        total_volume: {
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