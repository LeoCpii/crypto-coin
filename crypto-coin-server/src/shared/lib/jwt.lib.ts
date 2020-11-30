import jwt from 'jsonwebtoken';

export interface IJWT {
    id: string;
    email: string;
    name: string;
}

export class JWT {
    public generetaToken(data: IJWT) {
        return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' } );
    }

    public decodeToken(token: string): IJWT {
        return jwt.verify(token, process.env.SALT_KEY) as IJWT;
    }
}