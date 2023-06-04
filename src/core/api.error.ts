
import {StatusCodes} from "http-status-codes"

export default class ApiError extends Error {

    constructor(message:string , public httpStatus:StatusCodes ){
        super(message);
        this.message = message;
        this.httpStatus = httpStatus; 
    }

}