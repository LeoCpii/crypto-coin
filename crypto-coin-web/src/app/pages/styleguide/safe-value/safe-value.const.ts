// import { IValidTypes } from 'src/app/shared/components/item/item.component';

export interface IItemsSafeValue { label: string; value: string | number; type: any }

export const ITEMS_SAFE_VALUE: IItemsSafeValue[] = [
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