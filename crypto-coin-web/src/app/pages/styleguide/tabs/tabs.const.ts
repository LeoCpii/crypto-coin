export interface ISection {
    title: string;
    buttons: IButton[]
}

export interface IButton {
    label: string;
    disabled: boolean;
    isLoading: boolean;
    theme?: string;
}

export const SECTION: ISection[] = [
    {
        title: 'Standard',
        buttons: [
            {
                label: 'Primary',
                disabled: false,
                isLoading: false,
            },
            {
                label: 'Outline',
                disabled: false,
                isLoading: false,
                theme: 'outline'
            },
            {
                label: 'Outline Light',
                disabled: false,
                isLoading: false,
                theme: 'outline-light'
            },
            {
                label: 'No Border',
                disabled: false,
                isLoading: false,
                theme: 'no-border'
            }
        ]
    },
    {
        title: 'Disabled',
        buttons: [
            {
                label: 'Primary',
                disabled: true,
                isLoading: false,
            },
            {
                label: 'Outline',
                disabled: true,
                isLoading: false,
                theme: 'outline'
            },
            {
                label: 'Outline Light',
                disabled: true,
                isLoading: false,
                theme: 'outline-light'
            },
            {
                label: 'No Border',
                disabled: true,
                isLoading: false,
                theme: 'no-border'
            }
        ]
    },
    {
        title: 'Loading',
        buttons: [
            {
                label: 'Primary',
                disabled: false,
                isLoading: true,
            },
            {
                label: 'Outline',
                disabled: false,
                isLoading: true,
                theme: 'outline'
            },
            {
                label: 'Outline Light',
                disabled: false,
                isLoading: true,
                theme: 'outline-light'
            },
            {
                label: 'No Border',
                disabled: false,
                isLoading: true,
                theme: 'no-border'
            }
        ]
    },
]