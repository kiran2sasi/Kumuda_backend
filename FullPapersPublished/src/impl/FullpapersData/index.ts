import { fullpaperService } from "./types";
import * as t from "../../../dict/api/fullpaper/types";

const service = new fullpaperService();

export const fullpaperServiceImpl: t.FullpaperApi = {
    deleteFullPapersPublished: service.delete,
    getGetFullPapersPublished: service.get,
    getFullPapersPublished: service.getALL,
    updateFullPapersPublished: service.put,
    createFullPapersPublished: service.post,
};