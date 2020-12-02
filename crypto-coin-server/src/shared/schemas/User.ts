import { Schema, model, Document, Model } from 'mongoose';
import Validator from './../services/validator.service';
import { IWalletDoc } from './Wallet';

export interface IUser {
    name: string;
    email: string;
    wallet: IWalletDoc;
    favorites: Array<{ name: string; id: string }>
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
    },
    favorites: {
        type: [{
            name: { type: String },
            id: { type: String },
        }],
        default: []
    }
}, {
    timestamps: true
});

export default model<IUserDoc>('User', UserSchema);

export class UserHelper {
    private get user(): Model<IUserDoc, {}> {
        return model<IUserDoc>('User', UserSchema);
    }

    public async updateFavorite(id: string, favorites: { name: string; id: string }[]) {
        await this.user.updateOne(
            { _id: id, },
            { $set: { favorites, }, },
            { upsert: true }
        ).catch(e => {
            throw { message: e, status: 422 };
        });
    }
}