import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { COLORS_CHART } from 'src/app/shared/constants/colors.const';
import { FormatterService } from './../../../shared/services/formatter.service';
import * as moment from 'moment';
import { IButtonFilter } from 'src/app/shared/components/filter/filter.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

export const AREA_COMPARE = (series): IApexChart => ({
    colors: COLORS_CHART,
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

export const BUTTONS: IButtonFilter[] = [
    {
        label: 'Favoritos',
        active: false,
        fn: (data: IList[]): IList[] => {
            const local = new LocalStorageService();
            const favorites = local.getJson<IUser>('user').favorites;
            return data.filter(item => favorites.find(favorite => favorite.id === item.id));
        },
        group: 'time'
    },
    {
        label: 'Preço',
        active: false,
        fn: (data: IList[]): IList[] => {
            return data.sort((a, b) => a.market.price.brl > b.market.price.brl ? -1 : 1);
        },
        group: 'time'
    },
    {
        label: 'Tendência',
        active: false,
        fn: (data: IList[]): IList[] => {
            return data.sort((a, b) => a.market.changePercent24h > b.market.changePercent24h ? -1 : 1);
        },
        group: 'time'
    }
];
