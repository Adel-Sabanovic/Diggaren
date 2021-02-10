import { createValidationGuard } from "../utilis";

import { param } from "express-validator";
import { fetchAllChannels } from "../utilis";



/**
 * A validation guard that guards the current playing song url.
 * It sees that the url contains query param property named channel with values of "p1", "p2", "din_gata"
 */
export const currentPlayingSongParamsGuard = createValidationGuard([
    param("channelName")
    .custom(async (_, { 
        req: {
            params
        }
    }) => {

        const { channelName } = params;

        const allChannels = await fetchAllChannels();

        return !!allChannels[channelName]
    })
    .withMessage("channelName can only be p1, p2 and din_gata")
]);