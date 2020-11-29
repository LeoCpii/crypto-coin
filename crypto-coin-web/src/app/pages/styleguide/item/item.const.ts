// import { IValidTypes } from 'src/app/shared/components/item/item.component';

export interface IItems { label: string; value: string | number; type: any }

export const ITEMS: IItems[] = [
    {
        label: 'Standard',
        value: 'Valor sem formatação',
        type: 'standard'
    },
    {
        label: 'Currency',
        value: '1000',
        type: 'currency'
    },
    {
        label: 'Percent',
        value: .1,
        type: 'percent'
    },
]