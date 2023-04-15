import '@storybook/addon-console';
import './storybook.scss';
import { StyleManager } from '@components/managers';
import { BrowserRouter } from 'react-router-dom';

export const decorators = [
    (Story) => (
        <BrowserRouter>
            <Story/>
        </BrowserRouter>
    ),
    (Story) => (
        <StyleManager>
            <Story/>
        </StyleManager>
    ),
];

export const parameters = {
    layout: 'fullscreen',
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'Theme Background',
        values: [
            {
                name: 'Theme Background',
                value: '#DAE0E6',
            },
            {
                name: 'Dark Theme Background',
                value: '#1a1a1b',
            },
            {
                name: 'white',
                value: '#ffffff',
            },
            {
                name: 'black',
                value: '#000000',
            },
        ]
    },
    viewport: {
        viewports: {
            phoneSmall: {
                name: 'iPhone SE',
                styles: {
                    width: '375px',
                    height: '667px',
                },
            },
            matSmall: {
                name: 'Material Small',
                styles: {
                    width: '600px',
                    height: '600px',
                },
            },
            matMedium: {
                name: 'Material Medium',
                styles: {
                    width: '960px',
                    height: '960px',
                },
            },
            matLarge: {
                name: 'Material Large',
                styles: {
                    width: '1280px',
                    height: '600px',
                },
            },
            matExtraLarge: {
                name: 'Material Extra Large',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
};