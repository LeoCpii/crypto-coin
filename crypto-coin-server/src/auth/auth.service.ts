import { Request, Response, NextFunction } from 'express';
import { HandlerError } from '../shared/lib/error.lib';
import jwt from 'jsonwebtoken';

class Auth {
    public autorize(req: Request, res: Response, next: NextFunction) {
        const token = req.body.token || req.query.token || req.header('x-access-token');

        if (!token) {    
            next(new HandlerError(403, 'Acesso restrito'));
        } else {
            jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
                if(error) {           
                    next(new HandlerError(401, 'Token inválido'));
                } else {
                    next();
                }
            });
        }
    }
}

export default new Auth();