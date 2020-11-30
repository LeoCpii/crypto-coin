import { environment } from 'src/environments/environment';

export class Endpoints {
    private urlBase = environment.urlBaseAPI;
    private urlMock = environment.urlBaseMockAPI;
    private allUrlMock = false;

    constructor(private params: string, private mock: boolean, private paramsMock?: string) { }

    public get url(): string {
        if ((this.mock || this.allUrlMock) && !environment.production) {
            return this.paramsMock ? this.urlMock + this.paramsMock : this.urlMock + this.params;
        } else {
            return this.urlBase + this.params;
        }
    }
}
