export const SECTIONS = [
    {
        name: 'Standard',
        icons: ['search', 'eye', 'eye-slash', 'filter'],
        spinner: false,
    },
    {
        name: 'Spinner',
        icons: ['spinner', 'circle-o-notch', 'refresh', 'cog'],
        spinner: true,
    }
]

export const RISKS = Array.from(Array(6).keys());

export const LOADINGS = [
    { theme: 'primary' },
    { theme: 'white' },
]

export const SVGS = [
    { type: 'chevron-left' },
    { type: 'chevron-down' },
    { type: 'menu' },
    { type: 'password-visible' },
    { type: 'password-hidden' },
    { type: 'close' },
]

export const SVG_SIZES = [
    { type: 'menu', size: 'tiny' },
    { type: 'menu', size: 'small' },
    { type: 'menu', size: 'medium' },
    { type: 'menu', size: 'large' },
    { type: 'menu', size: 'x-large' },
]