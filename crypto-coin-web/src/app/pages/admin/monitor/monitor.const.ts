import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { COLORS } from 'src/app/shared/constants/colors.const';
import { FormatterService } from './../../../shared/services/formatter.service';
import * as moment from 'moment';
import { COLORS_REVERSE } from '../../../shared/constants/colors.const';

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

export const AREA_FAVORITES = (series): IApexChart => ({
    colors: COLORS_REVERSE(),
    series,
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        }
    },
    yaxis: {
        title: {
            text: "Preço"
        },
        labels: {
            formatter: (value) => {
                const formatter = new FormatterService();
                return formatter.currencyFormatter({ value: value, prefix: 'R$' });
            },
        }
    },
    xaxis: {
        type: "datetime"
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                const formatter = new FormatterService();
                return formatter.currencyFormatter({ value: val, prefix: 'R$' })
            }
        },
        x: {
            formatter: function (val) {
                return moment(val).format('DD/MM/YYYY HH:mm')
            }
        }
    },
});