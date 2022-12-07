import { APIscorService} from "./impl";
import * as t from "../../../dist/api/apIscore/types";

const service = new APIscorService();

export const APIscorServiceImpl: t.APIscoreApi = {
	postAPIscoreCreate: service.create,
	deleteAPIscoreDelete: service.delete,
	getAPIscoreGet: service.get,
	getAPIscoreGetAll: service.getAll,
	putAPIscoreUpdate: service.update,
};
