import { Request, Response } from "express";

import { resultMessage } from "../utilis";

import { NOT_FOUND } from "http-status";



/**
 * A controller that catches all routes that are not defined and responds with not found http status code
 * 
 * @param { Request } req 
 * 
 * @param { Response } res 
 */
export const pageNotFoundController = (req, res) => {

    const response = (
        resultMessage(
            false, 
            NOT_FOUND, 
            "Route is not defiend"
        )
    );

    console.log(response, 404, `Url doesnt exist ${req.url}`);

    return (
        res
        .status(NOT_FOUND)
        .json(response)
    );
};