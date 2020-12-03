export const COLORS = ['#00A868', '#FDD835', '#20252A', '#8E24AA', '#D81B60', '#34465d', '#3b5999', '#ff3300'];

export const COLORS_REVERSE = () => {
    const colors = COLORS.map((item: string) => item);
    return colors.reverse();
};