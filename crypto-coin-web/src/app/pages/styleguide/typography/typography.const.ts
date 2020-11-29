export interface ITypes { name: string, description: string; usage: string; link?: string }

export const TYPES: ITypes[] = [
    {
        name: 'header-title',
        description: 'Título utilizado para representar linhas de negócio (Previdência, Vida, FMP)',
        usage: '@include header-title;'
    },
    {
        name: 'page-title',
        description: 'Título para nomear uma página',
        usage: '@include page-title;'
    },
    {
        name: 'page-sub-title',
        description: 'Título utilizado para separar uma seção dentro da aplicação',
        usage: '@include page-sub-title;'
    },
    {
        name: 'text',
        description: 'Texto utilizado em parágrafos',
        usage: '@include text;'
    },
    {
        name: 'link-external',
        description: 'Texto utilizado em links externos',
        usage: '<app-link link="https://www.google.com/">{{ item.name }}</app-link>',
        link: 'https://www.google.com/'
    },
    {
        name: 'link-internal',
        description: 'Texto utilizado em links internos',
        usage: '<app-link link="/styleguide/color">{{ item.name }}</app-link>',
        link: '/styleguide/color'
    },
]