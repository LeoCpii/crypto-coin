import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { COLORS } from 'src/app/shared/constants/colors.const';
import { FormatterService } from './../../../shared/services/formatter.service';
import * as moment from 'moment';

export const AREA = (serie, name: string): IApexChart => ({
    colors: COLORS,
    series: [
        {
            name,
            data: serie
        }
    ],
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