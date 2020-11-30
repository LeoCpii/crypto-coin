import { Request, Response, NextFunction } from 'express';
import { HandlerError } from '../shared/lib/error.lib';
import Wallet, { ICoin, WalletHelper } from '../shared/schemas/Wallet';
import User, { IUser } from './../shared/schemas/User';

class UserController {
    public async user(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const email = req.query.email as string;
            const user = await User.findOne({ email: email });

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async wallet(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const email = req.params.email;
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
            const { email, walletId } = req.params as { email: string; walletId: string };
            const coin: ICoin = req.body;

            const user = await User.findOne({ email });

            if (!user) { throw new HandlerError(422, 'Usuário não encontrado'); }
            if (user.wallet.toString() !== walletId) { throw new HandlerError(401, 'Você não pode realizar essa operação'); }

            const wallet = await Wallet.findOne({ _id: walletId });

            const alredyExists = wallet.coins.find(item => item.id === coin.id);

            if (alredyExists) { throw new HandlerError(422, 'Moeda já adicionada à carteira'); }

            wallet.coins.push(coin);

            const walletHelper = new WalletHelper();

            await walletHelper.updateCoin(walletId, wallet.coins);

            return res.json({ message: 'Carteira atualizada com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    public async contribution(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email, walletId } = req.params as { email: string; walletId: string };
            const contribution: number = req.body.contribution;

            const user = await User.findOne({ email });

            if (!user) { throw new HandlerError(422, 'Usuário não encontrado'); }
            if (user.wallet.toString() !== walletId) { throw new HandlerError(401, 'Você não pode realizar essa operação'); }

            const wallet = await Wallet.findOne({ _id: walletId });

            const account = wallet.account + contribution;

            const walletHelper = new WalletHelper();
            await walletHelper.updateAccount(walletId, account);

            return res.json({ message: 'Carteira atualizada com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();