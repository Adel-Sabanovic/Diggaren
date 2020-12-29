import { resultMessage } from "../utilis";

import { INTERNAL_SERVER_ERROR } from "http-status";


/**
 * A middleware that catches all errors that are not explicitly managed and responds with internal server error http status code
 */
export const internalServerErrorController = (error, req, res, next) => {

    const response = (
        resultMessage(
            false, 
            INTERNAL_SERVER_ERROR, 
            "An unexpected error occurred",
            {
                name: error.name,
                error: error.message,
            }
        )
    );

    console.log(response);

    return (
        res
        .status(INTERNAL_SERVER_ERROR)
        .json(response )
    );
};