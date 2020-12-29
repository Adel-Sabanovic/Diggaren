import { createValidationGuard } from "../utilis";

import { query } from "express-validator";



/**
 * A validation guard that guards the current playing song url.
 * It sees that the url contains query param property named channel with values of "p1", "p2", "din_gata"
 */
export const currentPlayingSongQueryGuard = createValidationGuard([
    query("channel").isIn([ 
        "p1",
        "p2",
        "din_gata"
    ])
]);