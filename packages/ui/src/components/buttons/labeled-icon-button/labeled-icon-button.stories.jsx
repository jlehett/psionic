import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Favorite from '@assets/favorite.svg';
import LabeledIconButton from './labeled-icon-button';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'SvgIcon',
    'label',
    'color',
    'inactiveColor',
]);
setAsCategory(argTypes, 'Controls', [
    'onClick',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'buttons/LabeledIconButton',
    component: LabeledIconButton,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: 'fit-content', padding: '20px', margin: '40px', background: 'white', borderRadius: '8px',
            }}
        >
            <LabeledIconButton {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    SvgIcon: Favorite,
    label:   'Favorites',
    onClick: () => console.log('Clicked!'),
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    SvgIcon:       Favorite,
    label:         'Favorites',
    onClick:       () => console.log('Clicked!'),
    color:         'red',
    inactiveColor: 'blue',
};
