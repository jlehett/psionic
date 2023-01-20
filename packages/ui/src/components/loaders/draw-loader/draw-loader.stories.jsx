import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import DrawLoader from './draw-loader';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'SVG Definition', [
    'svg',
    'paths',
]);
setAsCategory(argTypes, 'UI', [
    'size',
    'color',
    'speed',
]);
setAsCategory(argTypes, 'Controls', [
    'progress',
]);

// Storybook default export
export default {
    title:     'loaders/DrawLoader',
    component: DrawLoader,
    argTypes,
};

function Template(args) {
    return (
        <div style={{
            margin: '40px', padding: '20px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content',
        }}
        >
            <DrawLoader {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    svg: {
        height:  '24',
        viewBox: '0 0 24 24',
        width:   '24',
    },
    paths: [
        {
            d:           'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
            strokeWidth: '0.5',
        },
    ],
};

// Complex Demo
export const Complex = Template.bind({});
Complex.args = {
    svg: {
        width:   '60px',
        height:  '60px',
        viewBox: '0 0 512 512',
    },
    paths: [
        {
            d:           'm490.1,94.3h-325.6c-7.8,0-12.4,5.5-10.4,13.6l47,161.7c1,4.2 5.2,7.3 10.4,7.3h232.7c5.2,0 9.4-3.1 10.4-7.3l45.9-161.7c1.8-5.3-1-13.6-10.4-13.6zm-53.2,160.7h-217.1l-9.4-32.3h235.9l-9.4,32.3zm14.6-53.3h-247.7l-9.3-32.3h266.4l-9.4,32.3zm15.6-54.2h-278.6l-9.4-32.3h297.5l-9.5,32.3z',
            strokeWidth: 4,
        },
        {
            d:           'M107.1,24.3c-1-5.2-5.2-8.3-10.4-8.3H11v20.9h77.2l71,285.9c1,5.2,5.2,8.3,10.4,8.3h275.5v-21.9H178L107.1,24.3z',
            strokeWidth: 4,
        },
        {
            d:           'm400.3,412.5c-23,0-41.7,18.8-41.7,41.7 0,23 18.8,41.7 41.7,41.7s41.7-18.8 41.7-41.7c0.1-22.9-18.7-41.7-41.7-41.7zm0,61.6c-10.4,0-19.8-9.4-19.8-19.8 0-10.4 8.3-19.8 19.8-19.8 11.5,0 19.8,9.4 19.8,19.8 0.1,10.4-9.3,19.8-19.8,19.8z',
            strokeWidth: 4,
        },
        {
            d:           'm197.9,412.5c-23,0-41.7,18.8-41.7,41.7 0,23 18.8,41.7 41.7,41.7s41.7-18.8 41.7-41.7c2.84217e-14-22.9-18.8-41.7-41.7-41.7zm0,61.6c-10.4,0-19.8-9.4-19.8-19.8 0-10.4 8.3-19.8 19.8-19.8 10.4,0 19.8,9.4 19.8,19.8-2.84217e-14,10.4-9.4,19.8-19.8,19.8z',
            strokeWidth: 4,
        },
    ],
    size:  200,
    color: '#138A00',
    speed: 4,
};

// Progress Demo
export const Progress = Template.bind({});
Progress.args = {
    svg: {
        height:  '24',
        viewBox: '0 0 24 24',
        width:   '24',
    },
    paths: [
        {
            d:           'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
            strokeWidth: '0.5',
        },
    ],
    progress: 0.3,
    speed:    0.5,
};
