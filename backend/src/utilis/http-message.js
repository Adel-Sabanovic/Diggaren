import httpStatus from "http-status";



/**
 * An object that represent a http code (for more information visit https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
 * 
 * @typedef {{
 *  status: number;
 *  message: number;
 * }} HttpStatusCode
 */

/**
 * 
 * @param {httpStatus} statusNumber - http status code number
 * 
 * @returns {{
 *  httpStatusCode: HttpStatusCode
 * }}
 * 
 * @example
 * 
 * import { NOT_FOUND } from "http-status";
 * 
 * App.use("/", (req, res) => {
 * 
 *      res.json(httpMessage(NOT_FOUND));
 * })
 * 
 * // Will send a json that looks as following
 * {
 *      httpStatusCode: {
 *          status: 404,
 *          message: "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible."
 *      }
 * } 
 */
export const httpMessage = statusNumber => {
    
    const status = httpStatus[statusNumber];

    const message = httpStatus[`${statusNumber}_MESSAGE`];

    return {
        httpStatusCode: {
            status,
            message
        }
    };
};