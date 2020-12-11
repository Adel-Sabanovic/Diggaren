import { resultMessage } from "../utilis";

import { NOT_FOUND } from "http-status";



/**
 * A controller that catches all routes that are not defiend and responsenses with not found http status code
 */
export const pageNotFoundController = (_, res) => {

    return (
        res
        .status(NOT_FOUND)
        .json(
            resultMessage(
                false, 
                NOT_FOUND, 
                "Route is not defiend"
            )
        )
    );
};