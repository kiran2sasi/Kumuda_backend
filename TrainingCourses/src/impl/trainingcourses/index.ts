import {TrainingCoursesService} from "./types";
import * as t from "../../../dict/api/trainingcourses/types";

const service = new TrainingCoursesService();

export const TrainingCoursesServiceImpl: t.TrainingcoursesApi = {
	postTrainingCoursesCreate: service.post,
	deleteTrainingCoursesDelete: service.delete,
	getTrainingCoursesGet: service.get,
	getTrainingCoursesGetAll: service.getALL,
	putTrainingCoursesUpdate: service.put,
};
