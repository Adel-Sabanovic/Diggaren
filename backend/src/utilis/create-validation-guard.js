import { resultMessage } from "./result-message";

import { validationResult } from "express-validator";

import { BAD_REQUEST } from "http-status";
//sd.nnwnkfw



/**
 * A middleware catches express-validator errors (for more information visit https://express-validator.github.io/docs/)
 * 
 */
const validationGuard = (req, res, next) => {

    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        
        return next();
    }

    const response = (
        resultMessage(
            false, 
            BAD_REQUEST, 
            "Validation failed", 
            errors.mapped()
        )
    );

    return (
        res
        .status(BAD_REQUEST)
        .json(response)
    );
};

/**
 * Creates 
 * 
 * @param { ValidationChain[] } validators - ExpressValidator
 *
 * @returns { ValidationChain[] } EpressValidator ValidationChain array
 * 
 * @example
 * import { body, checkSchema } from "express-validator";
 * 
 * const hsaNameInBody = createValidationGuard(body("name").isString());
 * 
 * App.use("/", hsaNameInBody, (req, res) => {
 * 
 *      return res.json({
 *          name: req.body.name
 *      })
 * });
 * 
 * // The following will check if the json body has name property that is of string type
 * // If not json will be send to the client that has the following form
 * {
 *      httpStatusCode: {
 *          status: 400,
 *          message: "The server cannot or will not process the request due to an apparent client error."
 *      },
 *      errors: errors.mapped()     
 * }
 */
export const createValidationGuard = validators => {

    return [
        ...validators,
        validationGuard,
    ];
};