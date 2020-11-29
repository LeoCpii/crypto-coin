import { IRequirement } from './password-requirements-item/password-requirements-item.component';

export const REQUIRIMENTS: IRequirement[] = [
    {
        label: 'Deve conter entre 6 e 10 caracteres;',
        active: false,
    },
    {
        label: 'Deve conter pelo menos 1 caracter numérico;',
        active: false,
    },
    {
        label: 'Deve conter pelo menos 1 caracter maiúsculo;',
        active: false,
    },
    {
        label: 'As senhas devem ser iguais;',
        active: false,
    }
];
