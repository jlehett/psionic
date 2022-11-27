//#region Imports

import Color from "color";
import { blackHasBetterContrastThanWhite } from "@utils/colors";

//#endregion

//#region Public Functions

/**
 * Returns a color that should be used when an element with the given color is hovered.
 *
 * @param {Color} color The color to determine the hovered color for
 * @returns {Color} The hovered color that should be used.
 */
export function getHoveredColor(color) {
    return blackHasBetterContrastThanWhite(color) ? color.mix(Color('black'), 0.1) : color.mix(Color('white'), 0.2);
}

//#endregion

//#region Private Functions

//#endregion