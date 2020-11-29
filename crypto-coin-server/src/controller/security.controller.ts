import { Request, Response, NextFunction } from 'express';
import { HandlerError } from '../shared/lib/error.lib';
import Wallet from '../shared/schemas/Wallet';
import User, { IUser } from './../shared/schemas/User';

class SecurityController {
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email }: IUser = req.body;

            const user = await User.findOne({ email });

            if (!!user) { throw new HandlerError(428, 'Usuário já em uso'); }

            const wallet = new Wallet();
            const newUser = new User({ name, email, wallet });
            const errors = newUser.validateSync();

            if (errors) { throw new HandlerError(422, errors) }

            await wallet.save();
            await newUser.save();

            return res.json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                wallet: {
                    id: newUser.wallet._id,
                    account: newUser.wallet.account,
                    coins: newUser.wallet.coins,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new SecurityController();