import express from "express";

import * as videoController from "../controller/video.controller"
import { ValidationSource, validator } from "../middleware/validator";
import { vaildatePagination, vaildateUUID } from "../types/global";

const router = express.Router();

router.get("/" , validator(vaildatePagination , ValidationSource.QUERY),videoController.getVideos )

router.get("/:id" , validator(vaildateUUID , ValidationSource.PARAM),videoController.getVideoById)

export default router;