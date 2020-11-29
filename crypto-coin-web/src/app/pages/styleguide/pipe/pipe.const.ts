export interface IPipeUsage { name: string; type: string; value: string | number; usage: string };

export const PIPES: IPipeUsage[] = [
    {
        name: 'Currency',
        type: 'currency',
        value: 5000,
        usage: `{{ cnpj | cnpj }}`
    },
    {
        name: 'Date',
        type: 'date',
        value: '2020-11-13T17:47:03.345Z',
        usage: `{{ date | date:"MM/dd/yyyy" }}`
    },
    {
        name: 'Percent',
        type: 'percent',
        value: 0.1,
        usage: `{{ percent | percent }}`
    }
]