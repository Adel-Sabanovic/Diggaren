import { httpMessage } from "./http-message";



/**
 * Used for consistent json responses
 * 
 * @param { boolean } success - Indicates if the request i successful
 * 
 * @param { number } statusNumber - Http status number
 * 
 * @param { string } message - A message to clarify the result 
 * 
 * @param { Record<string, any> } data - Data to be sent, this arg is optional
 */
export const resultMessage = (success, statusNumber, message, data) => { 

    return {
        success,
        message,
        data,
        ...httpMessage(statusNumber),
    };
}
