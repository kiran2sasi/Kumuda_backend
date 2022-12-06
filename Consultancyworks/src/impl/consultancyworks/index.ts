import { ConsultancyWorksService } from "./types";
import * as t from "../../../dict/api/consultancyworks/types";

const service = new ConsultancyWorksService();

export const ConsultancyWorksServiceImpl: t.ConsultancyworksApi = {
	postConsultancyWorksCreate: service.post,
	deleteConsultancyWorksDelete: service.delete,
	getConsultancyWorksGet: service.get,
	getConsultancyWorksGetAll: service.getALL,
	putConsultancyWorksUpdate: service.put,
};
