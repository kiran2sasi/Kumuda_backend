import { APIscoreApi } from "../../dist/api/apIscore/types";
import { ApiImplementation } from "../../dist/types";
import { APIscorServiceImpl } from "./APIscore";

export class ServiceImplementation implements ApiImplementation {
	apIscore: APIscoreApi =APIscorServiceImpl;
}
