import { Ajax } from "../lib/ajax.lib";
import { IUser } from "../schemas/User";

export class SecurityService {
    public async auth(params: IUser) {
        // const ajax = new Ajax();
        // const url = `${process.env.AUTH_API}/auth`;

        return await true;
    }
}