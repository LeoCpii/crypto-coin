import { Request, Response, NextFunction } from 'express';
import { HandlerError } from '../shared/lib/error.lib';
import { IJWT, JWT } from '../shared/lib/jwt.lib';
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

            const data: IJWT = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
            }

            const jwt = new JWT();
            const token = jwt.generetaToken(data);

            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email }: IUser = req.body;

            const user = await User.findOne({ email });

            if (!user) { throw new HandlerError(428, 'Email ou senha inválidos'); }

            const data: IJWT = {
                id: user._id,
                email: user.email,
                name: user.name,
            }

            const jwt = new JWT();
            const token = jwt.generetaToken(data);

            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }
}

export default new SecurityController();