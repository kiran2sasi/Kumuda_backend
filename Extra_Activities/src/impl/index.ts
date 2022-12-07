import { ExtraactivitiesApi } from "../../dict/api/extraactivities/types";
import { ApiImplementation } from "../../dict/types";
import { extraactivitiesServiceImpl } from "./extraactivies";

export class ServiceImplementation implements ApiImplementation {
	extraactivities: ExtraactivitiesApi = extraactivitiesServiceImpl;
}
