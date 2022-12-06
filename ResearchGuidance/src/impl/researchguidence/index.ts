import { ResearchGuidanceService } from "./types";
import * as t from "../../../dict/api/researchguidance/types";

const service = new ResearchGuidanceService();

export const ResearchGuidanceServiceImpl: t.ResearchguidanceApi = {
	postResearchGuidanceCreate: service.post,
	deleteResearchGuidanceDelete: service.delete,
	getResearchGuidanceGet: service.get,
	getResearchGuidanceGetAll: service.getALL,
	putResearchGuidanceUpdate: service.put,
};
