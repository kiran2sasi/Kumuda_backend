import { CoactivitiesApi } from "../../dict/api/coactivities/types";
import { ApiImplementation } from "../../dict/types";
import { coactivitiesServiceImpl } from "./coactivities";

export class ServiceImplementation implements ApiImplementation {
	coactivities: CoactivitiesApi = coactivitiesServiceImpl;
}
