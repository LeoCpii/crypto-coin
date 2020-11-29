class Validator {
    private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private telRegex = /(^\d{8,9}$)|(^$)/;
    private dddRegex = /(^\d{1,2}$)|(^$)/;
    private cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    private cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    private dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;
    private datetimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}\:\d{2}$/;
    private monthRegex = /^\d{2}\/\d{4}/;
    private cepRegex = /^[0-9]{5}-[\d]{3}$/;
    private onlyNumberRegex = /^([0-9])*$/;
    private colorRegex = /^#([a-zA-Z0-9-])*$/;
    private base64Regex = /^data:([A-Za-z-+/]+);base64,/;

    public isValidEmail(value: string) {
        return this.emailRegex.test(value);
    }

    public isValidDdd(value: string) {
        return this.dddRegex.test(value);
    }

    public isValidPhone(value: string) {
        return this.telRegex.test(value);
    }

    public isValidCpf(value: string) {
        return this.cpfRegex.test(value);
    }

    public isValidCnpj(value: string) {
        return this.cnpjRegex.test(value);
    }

    public isValidCnpjOrCpf(value: string) {
        return value == null ? false : value.length === 11 || value.length === 14;
    }

    public isValidDate(value: string) {
        return this.dateRegex.test(value);
    }

    public isValidDateTime(value: string) {
        return this.datetimeRegex.test(value);
    }

    public isValidMonth(value: string) {
        return this.monthRegex.test(value);
    }

    public isValidCep(value: string) {
        return this.cepRegex.test(value);
    }

    public isValidNumber(value: string) {
        return this.onlyNumberRegex.test(value);
    }

    public isValidColor(color: string) {
        return this.colorRegex.test(color);
    }

    public isValidEnum(valeu: string, enumerable) {
        let isValid = false;

        for (var key in enumerable) {
            if (enumerable[key] === valeu) {
                isValid = true;
                break;
            }
        }

        return isValid;
    }

    public isValidAge(value) {
        const arrData = value.split('-');

        const ano_aniversario = arrData[0];
        const mes_aniversario = arrData[1];
        const dia_aniversario = arrData[2];

        const d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate()

        let idade = ano_atual - ano_aniversario;

        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            idade--;
        }

        return idade > 0 && idade < 100;
    }

    public isValidBase64(base64) {
        return this.base64Regex.test(base64);
    }

}

export default new Validator();