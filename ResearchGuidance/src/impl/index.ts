import { ResearchguidanceApi } from "../../dict/api/researchguidance/types";
import { ApiImplementation } from "../../dict/types";
import { ResearchGuidanceServiceImpl } from "./researchguidence";

export class ServiceImplementation implements ApiImplementation {
	researchguidance: ResearchguidanceApi = ResearchGuidanceServiceImpl;
}
