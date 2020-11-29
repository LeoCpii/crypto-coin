// import { IFieldFilter } from 'src/app/shared/components/filter/filter.component';
// import { UtilsService } from 'src/app/shared/services/utils.service';

export interface IDataFilter {
    risco: number;
    fundo: {
        tipo: string;
        nome: string;
    },
    contribuicao: number;
    aporte: number;
    taxa: number;
}

export const DATA = [
    {
        risco: 1,
        fundo: {
            tipo: 'Renda Fixa Conservador',
            nome: 'Icatu Seg Classic Conservador FIC FI RF',
        },
        contribuicao: 300,
        aporte: 5000,
        taxa: 1,
    },
    {
        risco: 4,
        fundo: {
            tipo: 'Renda Fixa Conservador',
            nome: 'Icatu Seg Classic Conservador FIC FI RF',
        },
        contribuicao: 1500,
        aporte: 30000,
        taxa: .5,
    },
    {
        risco: 2,
        fundo: {
            tipo: 'Renda Fixa Conservador',
            nome: 'Icatu Seg Classic Conservador FIC FI RF',
        },
        contribuicao: 2500,
        aporte: 37000,
        taxa: .75,
    },
    {
        risco: 5,
        fundo: {
            tipo: 'Renda Fixa Conservador',
            nome: 'Icatu Seg Classic Conservador FIC FI RF',
        },
        contribuicao: 300,
        aporte: 5000,
        taxa: 5000,
    }
]

export const BUTTONS = [
    {
        label: 'Grau de risco',
        active: false,
        fn: <IDataFilter>(data: IDataFilter[], value: 1 | 2 | 3 | 4): IDataFilter[] => {
            return data.filter(item => item['risco'] === Number(value));
        },
        group: 'grau',
        type: 'select',
        field: {
            select: {
                control: 'risco',
                data: [
                    {
                        label: 'Muito baixo',
                        value: 1
                    },
                    {
                        label: 'Baixo',
                        value: 2
                    },
                    {
                        label: 'Médio',
                        value: 3
                    },
                    {
                        label: 'Alto',
                        value: 4
                    },
                    {
                        label: 'Muito alto',
                        value: 5
                    },
                ],
                keyLabel: 'label',
                keyValue: 'value',
            }
        }
    },
    {
        label: 'Contribuição mensal mínima',
        active: false,
        fn: <IDataFilter>(data: IDataFilter[], value: 0 | 1): IDataFilter[] => {
            console.log('value', value)
            // 0 - Contribuição Crescente
            if (value === 0) {
                return data.sort((a, b) => a['contribuicao'] > b['contribuicao'] ? -1 : 1);
            }

            // 1 - Contribuição Crescente
            if (value === 1) {
                return data.sort((a, b) => a['contribuicao'] < b['contribuicao'] ? -1 : 1);
            }
        },
        group: 'aplicacao',
        type: 'select',
        field: {
            select: {
                control: 'aplicacao',
                data: [
                    {
                        label: 'Maior',
                        value: 0
                    },
                    {
                        label: 'Menor',
                        value: 1
                    },
                ],
                keyLabel: 'label',
                keyValue: 'value',
            }
        }
    },{
        label: 'Contribuição mensal mínima',
        active: false,
        fn: <IDataFilter>(data: IDataFilter[], value: 0 | 1): IDataFilter[] => {
            console.log('value', value)
            // 0 - Contribuição Crescente
            if (value === 0) {
                return data.sort((a, b) => a['contribuicao'] > b['contribuicao'] ? -1 : 1);
            }

            // 1 - Contribuição Crescente
            if (value === 1) {
                return data.sort((a, b) => a['contribuicao'] < b['contribuicao'] ? -1 : 1);
            }
        },
        group: 'aplicacao',
        type: 'select',
        field: {
            select: {
                control: 'aplicacao',
                data: [
                    {
                        label: 'Maior',
                        value: 0
                    },
                    {
                        label: 'Menor',
                        value: 1
                    },
                ],
                keyLabel: 'label',
                keyValue: 'value',
            }
        }
    }
];