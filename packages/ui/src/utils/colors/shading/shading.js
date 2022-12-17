//#region Imports

import Color from "color";
import { blackHasBetterContrastThanWhite } from "@utils/colors";

//#endregion

//#region Public Functions

/**
 * Returns a color that should be used when an element with the given color is hovered.
 *
 * @param {Color} color The color to determine the hovered color for
 * @param {number} [customLightFactor=0.2] The factor to lighten the color by
 * @param {number} [customDarkFactor=0.1] The factor to darken the color by
 * @returns {Color} The hovered color that should be used.
 */
export function getHoveredColor(color, customLightFactor=0.2, customDarkFactor=0.1) {
    return blackHasBetterContrastThanWhite(color) ? color.mix(Color('black'), customDarkFactor) : color.mix(Color('white'), customLightFactor);
}

//#endregion

//#region Private Functions

//#endregion