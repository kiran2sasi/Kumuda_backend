import { AppraisalService } from "./impl";
import * as t from "../../../dict/api/examDuties/types";

const service = new AppraisalService();

export const appraisalServiceImpl: t.ExamDutiesApi = {
	postExamDutiesCreate: service.post,
	deleteExamDutiesDelete: service.delete,
	getExamDutiesGet: service.get,
	getExamDutiesGetAll: service.getAll,
	putExamDutiesUpdate:	service.put

};