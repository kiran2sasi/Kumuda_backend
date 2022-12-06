import { AppraisalService } from "./impl";
import * as t from "../../../dict/api/relevantData/types";

const service = new AppraisalService();

export const appraisalServiceImpl: t.RelevantDataApi = {
	postRelevantDataCreate: service.post,
	deleteRelevantDataDelete: service.delete,
	getRelevantDataGet: service.get,
	getRelevantDataGetAll: service.getAll,
	putRelevantDataUpdate:	service.put

};