import { Response } from "express";
import {StatusCodes} from "http-status-codes"

type SuccessBody = {
    success:boolean,
    status:StatusCodes,
    message:string,
    data : string
}

export default class SuccessResponse{

    constructor(public status:StatusCodes ,public message :string , public data : any){
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public send(res : Response){
        const response : SuccessBody = {
            success:true,
            status:this.status,
            message : this.message,
            data: this.data
        }
        return res.status(this.status).send(response);
    }
}