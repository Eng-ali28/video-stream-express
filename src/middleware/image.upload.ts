import multer , {  DiskStorageOptions, FileFilterCallback, diskStorage} from 'multer';
import {Request} from "express";
import {join , parse, resolve} from "path";
import { randomUUID } from 'crypto';



const currentPath = join(__dirname , ".."  , "public" , "uploads");
export default class UploadImage {
    private filepath : string
    private folderName:string;
    private whitelist = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/svg+xml",
        "image/webp"
    ]
    constructor(folderName:string){
        this.filepath = join(currentPath, folderName);
        this.folderName = folderName
    }

    private async initUpload(){
        const storage:DiskStorageOptions=  {
            destination : (req : Request  , file:Express.Multer.File , cb :any)=>{
                cb(null , this.filepath);
            },
            filename: (req : Request  , file:Express.Multer.File , cb :any)=>{
                const {name} = parse(file.originalname);
                const filename = `${randomUUID()}-${Date.now()}-${name}.webp`;
            },
        };

        const fileFilter = (req : Request  , file:Express.Multer.File , cb :FileFilterCallback)=>{
            if(!this.whitelist.includes(file.mimetype)){
                
            }
        }

        return multer({
            storage:diskStorage(storage),
            fileFilter:(req : Request  , file:Express.Multer.File , cb :any)=>{

            }
        })
    }
}