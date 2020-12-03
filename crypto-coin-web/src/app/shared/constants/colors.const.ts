export const COLORS_CHART = ['#00A868', '#FDD835', '#20252A', '#8E24AA', '#D81B60', '#F9A825', '#3b5999', '#F06292'];

export const COLORS_CHART_REVERSE = () => {
    const colors = COLORS_CHART.map((item: string) => item);
    return colors.reverse();
};