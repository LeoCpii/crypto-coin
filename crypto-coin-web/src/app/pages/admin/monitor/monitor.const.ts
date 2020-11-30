import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { COLORS } from 'src/app/shared/constants/colors.const';
import { FormatterService } from './../../../shared/services/formatter.service';

export const CHART = (serie: Array<number>, labels: string[]): IApexChart => ({
    series: serie,
    chart: {
        type: "donut",
    },
    colors: COLORS,
    labels: labels,
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    tooltip: {
        y: {
            formatter: (val: number) => {
                const formatter = new FormatterService();
                return formatter.currencyFormatter({ value: val, prefix: 'R$' })
            }
        }
    }
})

export const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];