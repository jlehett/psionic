# @psionic/ui

## 1.3.2

<i>January 30, 2023</i>

* 🛠️ Added a separate `TooltipProps` prop for customizing the `StickyTooltip` component. `...passThruProps` will now be passed to the internally wrapped component which owns the tooltip, instead.

## 1.3.1

<i>January 30, 2023</i>

* 🛠️ Update the `StickyTooltip` component to utilize ReactDOM portal's to render the tooltip in a way that is less likely to cause
issues in parent components.

## 1.3.0

<i>January 30, 2023</i>

* 🚀 The `TextField` component's `validator` callback prop now takes in an additional argument representing the form's current data.

## 1.2.2

<i>January 30, 2023</i>

* 🛠️ Fix issue where the `Form` component would never become unmarked as "submitting" if the form was invalid at the time it was submitted.

## 1.2.1

<i>January 30, 2023</i>

* 🛠️ Fixed some missing accessibility outlines.

## 1.2.0

<i>January 30, 2023</i>

* 🚀 Updated the `Button` component to support tracking a parent form's `submitting` state in order to easily disable buttons while a form is submitting.
* 🛠️ Fixed accessibility styling to not use the `!important` flag.

## 1.1.2

<i>January 30, 2023</i>

* 🛠️ Add `react-router` and `react-router-dom` to the rollup `externals` to fix an issue where the `IconLink` component was causing crashes.

## 1.1.1

<i>January 30, 2023</i>

* 🛠️ Fix missing exports of some components.

## 1.1.0

<i>January 29, 2023</i>

* 🎨 New `theme` prop added to the `StyleManager` component. This allows you to uniformly update the colors of all `@psionic/ui` components in your app. See the `StyleManager` component's documentation for more details.
* 🚀 New `ScrambleReveal` text animation component!
* 🛠️ Added an `animationSpeed` prop to the `TintOverlay` component that can be used to customize the speed of its animation.
* 🛠️ Added a `color` prop to the `TextField` component which allows the user to customize the color of the text field's focus outline.

## 1.0.0

<i>January 21, 2023</i>

### !!!BREAKING CHANGES!!!

* 🛠️ `LetterSpacingReveal` component now uses an `activated` prop to determine when to play the animation instead of auto-playing based on the component's visibility in the viewport. This should make it more broadly applicable and customizable.
* 🛠️ `TypingReveal` component now uses an `activated` prop to determine when to play the animation instead of auto-playing based on the component's visibility in the viewport. This should make it more broadly applicable and customizable.

### New Features

* 🚀 New `IconLink` component!
* 🚀 New `SlideUp` animation component!
* 🚀 New `TintOverlay` animation component!

### Other Changes

* 🎥 Added better animations to the `Dialog` component.
* 🛠️ Roboto font family included in the text animation components' styles.

### Bug Fixes

* 🛠️ Fixed issue causing the `Dialog` component to not close when clicking outside of it, even if the `closeOnClickOutside` prop was set to `true`.

## 0.0.7

<i>January 20, 2023</i>

* 🛠️ Ran through an accessibility pass of all existing components.
    * 👁️ Focused elements will now have a pink outline to make their focus visible. This is a global style that can be overridden.
    * ⌨️ The `Dialog` component is now more accessible to keyboard-only users.
    * ⌨️ The `Radio` and `RadioGroup` components now operate like normal HTML radio group buttons, and can be navigated with the arrow keys.
    * ⌨️ The `FloatingActionMenu` and `FloatingActionButton` components are now more accessible to keyboard-only users.
    * 🔉 Various aria-labels have been added, as well as props to add custom aria-labels to components, to make the components more accessible to screen readers.

## 0.0.6

<i>January 19, 2023</i>

* 🛠️ Added support for React v17 and up.
* 🛠️ Added support for Framer Motion v6 and up.

## 0.0.5

<i>December 20, 2022</i>

* 🛠️ Took a pass at making the UI components more consistent across browsers and systems.

## 0.0.4

<i>December 19, 2022</i>

* 🛠️ Removed SCSS layers usage since support in popular browsers is not high enough yet.

## 0.0.3

<i>December 18, 2022</i>

* 🛠️ CSS now properly supplied by default to components.

## 0.0.2

<i>December 17, 2022</i>

* ✍️ Minor documentation updates.

## 0.0.1

<i>December 17, 2022</i>

* 🥳 First publish of `@psionic/ui`.
* 🧰 Create various fully-documented UI components w/ Storybook demos for use in React applications.