import { extraactivitiesService } from "./impl";
import * as t from "../../../dict/api/extraactivities/types";

const service = new extraactivitiesService();

export const extraactivitiesServiceImpl: t.ExtraactivitiesApi = {
	postExtraactivitiesCreate: service.create,
	deleteExtraactivitiesDelete: service.delete,
	getExtraactivitiesGet: service.get,
	getExtraactivitiesGetAll: service.getAll,
	putExtraactivitiesUpdate: service.update,
};
