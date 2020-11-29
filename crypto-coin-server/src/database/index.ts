import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
    constructor() { }
    public databaseServer() {
        mongoose.connect(process.env.DATABASE_CONNECT, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    }
}

export default new Database().databaseServer;