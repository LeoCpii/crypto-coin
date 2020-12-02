import { Request, Response, NextFunction } from 'express';
import CoinGecko from 'coingecko-api';
import { ICoinDetail, ICoinSimpleDetail } from '../shared/schemas/Broker';

class BrokerController {
    public async discovery(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const CoinGeckoClient = new CoinGecko();

        const data = await CoinGeckoClient.ping();

        return res.json({ message: data });
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const CoinGeckoClient = new CoinGecko();

            const coins: { data: ICoinSimpleDetail[] } = await CoinGeckoClient.coins.all();

            const map = coins.data.map(coin => ({
                id: coin.id,
                symbol: coin.symbol,
                name: coin.name,
                image: {
                    thumb: coin.image.thumb,
                    small: coin.image.small,
                    large: coin.image.large,
                },
                market: {
                    rank: coin.market_data.market_cap_rank,
                    changePercent24h: coin.market_data.price_change_percentage_24h,
                    price: {
                        brl: coin.market_data.current_price.brl,
                        usd: coin.market_data.current_price.usd,
                    },
                    market_cap: {
                        brl: coin.market_data.market_cap.brl,
                        usd: coin.market_data.market_cap.usd,
                    }
                }
            }));

            return res.json(map);
        } catch (error) {
            next(error);
        }
    }

    public async detail(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.coinId;

            const CoinGeckoClient = new CoinGecko();

            const detail: { data: ICoinDetail } = await CoinGeckoClient.coins.fetch(id, { tickers: false });

            const map = {
                id: detail.data.id,
                symbol: detail.data.symbol,
                name: detail.data.name,
                description: detail.data.description.en,
                links: {
                    homepage: detail.data.links.homepage.length ? detail.data.links.homepage[0] : '-',
                    twitter: detail.data.links.twitter_screen_name,
                    facebook: detail.data.links.facebook_username,
                    reddit: detail.data.links.subreddit_url,
                    github: detail.data.links.repos_url.github.length ? detail.data.links.repos_url.github[0] : '-',
                },
                image: {
                    thumb: detail.data.image.thumb,
                    small: detail.data.image.small,
                    large: detail.data.image.large,
                },
                market_data: {
                    rank: detail.data.market_data.market_cap_rank,
                    price: {
                        brl: detail.data.market_data.current_price.brl,
                        usd: detail.data.market_data.current_price.usd,
                    },
                    market_cap: {
                        brl: detail.data.market_data.market_cap.brl,
                        usd: detail.data.market_data.market_cap.usd,
                    },
                    volume: {
                        brl: detail.data.market_data.total_volume.brl,
                        usd: detail.data.market_data.total_volume.usd,
                    },
                    high_24h: {
                        brl: detail.data.market_data.high_24h.brl,
                        usd: detail.data.market_data.high_24h.usd,
                    },
                    low_24h: {
                        brl: detail.data.market_data.low_24h.brl,
                        usd: detail.data.market_data.low_24h.usd,
                    }
                }
            }

            return res.json(map);
        } catch (error) {
            next(error);
        }
    }

    public async marketChart(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const idCoin = req.params.coinId;
            const { from, to } = req.query;

            const CoinGeckoClient = new CoinGecko();

            const market = await CoinGeckoClient.coins.fetchMarketChartRange(idCoin, {
                vs_currency: 'brl', from, to,
            });

            return res.json(market.data);
        } catch (error) {
            next(error);
        }
    }
}

export default new BrokerController();