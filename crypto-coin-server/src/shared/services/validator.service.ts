class Validator {
    private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;;
    private onlyNumberRegex = /^([0-9])*$/;

    public isValidEmail(value: string) {
        return this.emailRegex.test(value);
    }

    public isValidString(value: any) {
        return typeof value === 'string' ;
    }

    public isValidNumber(value: string) {
        return this.onlyNumberRegex.test(value);
    }

    public isValidEnum(valeu: string, enumerable: { [x: string]: string; }): boolean {
        let isValid = false;

        for (var key in enumerable) {
            if (enumerable[key] === valeu) {
                isValid = true;
                break;
            }
        }

        return isValid;
    }
}

export default new Validator();