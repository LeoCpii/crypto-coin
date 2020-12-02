import { Request, Response, NextFunction } from 'express';
import { HandlerError } from '../shared/lib/error.lib';
import Wallet, { ICoin, WalletHelper } from '../shared/schemas/Wallet';
import User, { UserHelper } from './../shared/schemas/User';
import { CurrentUser } from './../shared/lib/curren-user.lib';
import CoinGecko from 'coingecko-api';
import { ICoinDetail } from '../shared/schemas/Broker';

class UserController {
    public async user(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const token = req.header('x-access-token');
            const currentService = new CurrentUser();
            const email = currentService.current(token);

            const user = await User.findOne({ email: email });

            if (!user) { return res.json({}); }

            return res.json({
                favorites: user.favorites,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }

    public async wallet(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const token = req.header('x-access-token');
            const currentService = new CurrentUser();
            const email = currentService.current(token);

            const user = await User.findOne({ email: email }).populate(['wallet']);

            return res.json({
                id: user.wallet._id,
                account: user.wallet.account,
                coins: user.wallet.coins,
            });
        } catch (error) {
            next(error);
        }
    }

    public async addCoin(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const CoinGeckoClient = new CoinGecko();

            const token = req.header('x-access-token');
            const currentService = new CurrentUser();
            const email = currentService.current(token);

            const coin: ICoin = req.body;

            const detail: { data: ICoinDetail } = await CoinGeckoClient.coins.fetch(coin.id, {
                tickers: false,
                community_data: false,
                developer_data: false,
                localization: false,
                sparkline: false
            });

            const debiting = detail.data.market_data.current_price.brl * coin.quota;

            const user = await User.findOne({ email });
            const walletId = user.wallet._id;

            if (!user) { throw new HandlerError(422, 'Usuário não encontrado'); }

            const wallet = await Wallet.findOne({ _id: walletId });

            const alredyExists = wallet.coins.find(item => item.id === coin.id);

            if (alredyExists) {
                const index = wallet.coins.findIndex(current => current.id === coin.id);
                wallet.coins[index].quota = coin.quota = coin.quota + wallet.coins[index].quota;
            } else {
                wallet.coins.push(coin);
            }

            const newAccount = wallet.account - debiting;
            const walletHelper = new WalletHelper();

            await walletHelper.updateCoin(walletId, wallet.coins, newAccount);

            return res.json({ message: 'Carteira atualizada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    public async contribution(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const token = req.header('x-access-token');
            const currentService = new CurrentUser();
            const email = currentService.current(token);

            const contribution: number = req.body.contribution;

            const user = await User.findOne({ email });
            const walletId = user.wallet._id;

            if (!user) { throw new HandlerError(422, 'Usuário não encontrado'); }

            const wallet = await Wallet.findOne({ _id: walletId });

            const account = wallet.account + contribution;

            const walletHelper = new WalletHelper();
            await walletHelper.updateAccount(walletId, account);

            return res.json({ message: 'Carteira atualizada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    public async updateFavorite(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const coins = req.body as { name: string; id: string }[];
            const token = req.header('x-access-token');
            const currentService = new CurrentUser();
            const email = currentService.current(token);

            const user = await User.findOne({ email });

            if (!user) { throw new HandlerError(422, 'Usuário não encontrado'); }

            if (coins.length > 3) { throw new HandlerError(428, 'Limite de até 3 favoritos'); }

            const userHelper = new UserHelper();

            await userHelper.updateFavorite(user._id, coins);

            return res.json({ message: 'Favoritos atualizados com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();