import { AppraisalService } from "./impl";
import * as t from "../../../dict/api/learning/types";

const service = new AppraisalService();

export const appraisalServiceImpl: t.LearningApi = {
	postLearningProcessCreate: service.post,
	deleteLearningProcessDelete: service.delete,
	getLearningProcessGet: service.get,
	getLearningProcessGetAll: service.getAll,
	putLearningProcessUpdate:	service.put

};