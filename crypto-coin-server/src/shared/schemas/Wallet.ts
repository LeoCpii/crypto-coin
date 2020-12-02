import { Schema, model, Document, Model } from 'mongoose';

export interface IWallet {
    account: number;
    coins: ICoin[]
};

export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    quota: number;
};

export interface IWalletDoc extends IWallet, Document { }

/*
* Model - Wallet
*/
const WalletSchema = new Schema({
    account: {
        type: Number,
        default: 0
    },
    coins: {
        type: [{
            id: { type: String },
            name: { type: String },
            symbol: { type: String },
            quota: { type: Number },
        }],
        default: [],
        _id: false
    }
}, {
    timestamps: true
});

export default model<IWalletDoc>('Wallet', WalletSchema);

export class WalletHelper {
    private get wallet(): Model<IWalletDoc, {}> {
        return model<IWalletDoc>('Wallet', WalletSchema);
    }

    public async updateCoin(id: string, coin: ICoin[], account: number) {
        await this.wallet.updateOne(
            { _id: id, },
            {
                $set: {
                    account: account,
                    coins: coin
                },
            },
            { upsert: true }
        ).catch(e => {
            throw { message: e, status: 422 };
        });
    }

    public async updateAccount(id: string, contribution: number) {
        await this.wallet.updateOne(
            { _id: id, },
            {
                $set: {
                    account: contribution,
                },
            },
            { upsert: true }
        ).catch(e => {
            throw { message: e, status: 422 };
        });
    }
}