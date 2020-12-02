import { JWT } from "./jwt.lib"

export class CurrentUser {
    public current(token: string): string {
        const jwt = new JWT();
        return jwt.decodeToken(token).email;
    }
}