import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Favorite from '@assets/favorite.svg';
import IconLink from './icon-link';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'SvgIcon',
    'label',
    'color',
    'inactiveColor',
    'disabled',
    'disabledColor',
]);
setAsCategory(argTypes, 'Controls', [
    'href',
    'to',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'links/IconLink',
    component: IconLink,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: 'fit-content', padding: '20px', margin: '40px', background: 'white', borderRadius: '8px',
            }}
        >
            <IconLink {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    SvgIcon: Favorite,
    label:   'Favorites',
    to:      '/?path=/story/links-iconlink--colored',
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    SvgIcon:       Favorite,
    label:         'Favorites',
    to:            '/?path=/story/links-iconlink--basic',
    color:         'red',
    inactiveColor: 'blue',
};

// href Demo
export const Href = Template.bind({});
Href.args = {
    SvgIcon: Favorite,
    label:   'Favorites',
    href:    'https://www.google.com',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    SvgIcon:  Favorite,
    label:    'Favorites',
    href:     'https://www.google.com',
    disabled: true,
};
