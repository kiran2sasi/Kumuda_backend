import { AppraisalService } from "./impl";
import * as t from "../../../dict/api/teaching/types";

const service = new AppraisalService();

export const appraisalServiceImpl: t.TeachingApi = {
	postTeachingProcessCreate: service.post,
	deleteTeachingProcessDelete: service.delete,
	getTeachingProcessGet: service.get,
	getTeachingProcessGetAll: service.getAll,
	putTeachingProcessUpdate:	service.put

};