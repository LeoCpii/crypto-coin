import { Schema, model, Document } from 'mongoose';
import Validator from './../services/validator.service';
import { IWalletDoc } from './Wallet';

export interface IUser {
    name: string;
    email: string;
    wallet: IWalletDoc;
};

interface IUserDoc extends IUser, Document { }

/*
* Model - User
*/
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        validate: {
            validator: (value: string) => Validator.isValidEmail(value),
            message: (props: { value: string; }) => `${props.value} não é um email válido!`
        }
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
    }
}, {
    timestamps: true
});

export default model<IUserDoc>('User', UserSchema);