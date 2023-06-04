import multer , {  DiskStorageOptions, FileFilterCallback, diskStorage} from 'multer';
import {Request , Response  , NextFunction} from "express"

import {join , parse, resolve} from "path";
import { randomUUID } from 'crypto';
import {StatusCodes} from "http-status-codes"
import ApiError from '../core/api.error';
import * as util from 'util';
import * as fs from "fs";


const currentPath = join(__dirname , ".."  , "public" , "uploads");
export default class UploadVideo {
    private filepath : string
    private folderName:string;
    private whitelist = [
        "video/mp4",
    ]

    constructor(folderName:string){
        this.folderName = "video/" + folderName;
        this.filepath = resolve(currentPath, this.folderName);
    }

    private  initUpload(){
        if(!fs.existsSync(join(currentPath , this.filepath))) fs.mkdirSync(join(currentPath , this.filepath) , {recursive:true})

        const storage:DiskStorageOptions=  {
            destination : (req : Request  , file:Express.Multer.File , cb :any)=>{
                cb(null , this.filepath);
            },
            filename: (req : Request  , file:Express.Multer.File , cb :any)=>{
                const {name} = parse(file.originalname);
                const filename = `${randomUUID()}-${Date.now()}-${name}.mp4`;
                cb(null , filename)
            },
        };

        const fileFilter = (req : Request  , file:Express.Multer.File , cb :FileFilterCallback)=>{
            if(!this.whitelist.includes(file.mimetype)){
                return cb(new ApiError("File must be image." , StatusCodes.UNSUPPORTED_MEDIA_TYPE))
            }

            const fileSize = parseInt(req.headers["content-length"] as string);

            if(fileSize > 20971520){
                return cb(new ApiError("Max size you can uploaded is 20mb" , StatusCodes.BAD_REQUEST))
            }

            cb(null , true)
        }

        return multer({
            storage:diskStorage(storage),
            fileFilter
        })
    }

    public async singleImage(fieldName : string , required : boolean = true){
        return async (req:Request , res:Response , next:NextFunction)=>{
            await util.promisify(this.initUpload().single(fieldName))(req , res);

            if(required && !req.file){
                throw new ApiError("You must select one image" , StatusCodes.BAD_REQUEST);
            }
            req.file ?  req.file.path = this.folderName + "/" + req.file.filename : null;

            next();
        }
    }
}