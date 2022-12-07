import { RelevantInfoService} from "./impl";
import * as t from "../../../dist/api/relevantInfo/types";

const service = new RelevantInfoService();

export const RelevantInfoServiceImpl: t.RelevantInfoApi = {
	postRelevantInfoCreate: service.create,
	deleteRelevantInfoDelete: service.delete,
	getRelevantInfoGet: service.get,
	getRelevantInfoGetAll: service.getAll,
	putRelevantInfoUpdate: service.update,
};
