export class Utils {
    constructor() { }

    private get WHITE_LIST() {
        return ['development', 'test'];
    }

    get isNoProd() {
        return this.WHITE_LIST.includes(process.env.NODE_ENV);
    }

    public EhNuloOuVazio(element: any): boolean {
        return (
            element === '' ||
            element === null ||
            element === undefined ||
            element.length === 0 ||
            Object.keys(element).length === 0
        ) ? true : false;
    }
}