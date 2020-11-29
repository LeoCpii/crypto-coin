import { Utils } from '../../src/shared/lib/utils.lib';
import { expect } from 'chai';
import 'mocha';

describe('Validar Funcao EhNuloOuVazio', () => {
    const utils = new Utils();
    it(`Deve retornar true quando parametro for ""`, () => {
        const result = utils.EhNuloOuVazio('');
        expect(result).to.equal(true);
    });
    it(`Deve retornar true quando parametro for {}`, () => {
        const result = utils.EhNuloOuVazio({});
        expect(result).to.equal(true);
    });
    it(`Deve retornar true quando parametro for undefined`, () => {
        const result = utils.EhNuloOuVazio(undefined);
        expect(result).to.equal(true);
    });
    it(`Deve retornar true quando parametro for []`, () => {
        const result = utils.EhNuloOuVazio([]);
        expect(result).to.equal(true);
    });
    it(`Deve retornar false quando parametro for [1]`, () => {
        const result = utils.EhNuloOuVazio([1]);
        expect(result).to.equal(false);
    });
});

describe('Validar Funcao hasStatusError', () => {
    it(`Deve retornar false quando parametro for da familia 200`, () => {
        const result = utils.hasStatusError(200);
        expect(result).to.equal(false);
    });
    it(`Deve retornar true quando parametro não for da familia 200`, () => {
        const result = utils.hasStatusError(500);
        expect(result).to.equal(true);
    });
});