//#region Imports

import Color from "color";

//#endregion

//#region Public Functions

/**
 * Returns either black or white color, depending on which one has better contrast with the given color.
 *
 * @param {Color} color The color to test the BW contrast against
 * @param {number} [whiteContrastMin=3] The minimum contrast level at which white should be considered
 * @returns {Color} Either black or white color, depending on which has better contrast
 */
export function getContrastingBWColor(color, whiteContrastMin=3) {
    const blackContrast = color.contrast(Color('black'));
    const whiteContrast = color.contrast(Color('white'));
    return whiteContrast < whiteContrastMin && blackContrast > whiteContrast ? Color('black') : Color('white');
}

//#endregion

//#region Private Functions

//#endregion