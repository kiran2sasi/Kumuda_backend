import { FullpaperApi } from "../../dict/api/fullpaper/types";
import { ApiImplementation } from "../../dict/types";
import { fullpaperServiceImpl } from "./FullpapersData";

export class ServiceImplementation implements ApiImplementation {
	fullpaper: FullpaperApi = fullpaperServiceImpl;
}