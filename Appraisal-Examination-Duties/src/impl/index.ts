import { ExamDutiesApi } from "../../dict/api/examDuties/types";
import { ApiImplementation } from "../../dict/types";
import { appraisalServiceImpl } from "./ExamDuties";

export class ServiceImplementation implements ApiImplementation {
	examDuties: ExamDutiesApi = appraisalServiceImpl;
}