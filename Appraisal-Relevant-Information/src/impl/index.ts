import { RelevantDataApi } from "../../dict/api/relevantData/types";
import { ApiImplementation } from "../../dict/types";
import { appraisalServiceImpl } from "./RelevantData";

export class ServiceImplementation implements ApiImplementation {
	relevantData: RelevantDataApi = appraisalServiceImpl;
}