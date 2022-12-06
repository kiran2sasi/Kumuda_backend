import { LearningApi } from "../../dict/api/learning/types";
import { ApiImplementation } from "../../dict/types";
import { appraisalServiceImpl } from "./Learning";

export class ServiceImplementation implements ApiImplementation {
	learning: LearningApi = appraisalServiceImpl;
}