import { CoactivitiesService } from "./impl";
import * as t from "../../../dict/api/coactivities/types";

const service = new CoactivitiesService();

export const coactivitiesServiceImpl: t.CoactivitiesApi = {
	postCoactivitiesCreate: service.create,
	deleteCoactivitiesDelete: service.delete,
	getCoactivitiesGet: service.get,
	getCoactivitiesGetAll: service.getAll,
	putCoactivitiesUpdate: service.update,
};
