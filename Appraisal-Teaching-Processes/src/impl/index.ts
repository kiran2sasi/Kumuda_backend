import { TeachingApi } from "../../dict/api/teaching/types";
import { ApiImplementation } from "../../dict/types";
import { appraisalServiceImpl } from "./Teaching";

export class ServiceImplementation implements ApiImplementation {
	teaching: TeachingApi = appraisalServiceImpl;
}