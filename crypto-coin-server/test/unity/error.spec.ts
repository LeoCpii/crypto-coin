import { expect } from 'chai';
import { HandlerError } from '../../src/shared/lib/error.lib';
import 'mocha';

describe('Servico de erro', () => {
    it(`Deve retornar objeto de erro quando message for string`, () => {
        const data: {} = new HandlerError(500, 'Erro interno', false);
        expect(data['status']).to.equal(500);
        expect(data['message']).to.equal('Erro interno');
        expect(data['redirect']).to.equal(false);
    });

    it(`Deve retornar objeto de erro quando message for objeto`, () => {
        const data: HandlerError = new HandlerError(500, { message: 'Erro ao integrar sistema' }, false);
        expect(data['status']).to.equal(500);
        expect(data['message']).to.equal('Erro ao integrar sistema');
        expect(data['redirect']).to.equal(false);
    });

    it(`Deve retornar objeto de erro quando message for objeto`, () => {
        const data: HandlerError = new HandlerError(500, {
            errors: {
                a: {
                    message: 'Erro A'
                },
            }
        }, false);
        expect(data['status']).to.equal(500);
        expect(data['redirect']).to.equal(false);
    });
});