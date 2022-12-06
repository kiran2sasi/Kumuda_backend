import { TrainingcoursesApi } from "../../dict/api/trainingcourses/types";
import { ApiImplementation } from "../../dict/types";
import { TrainingCoursesServiceImpl } from "./trainingcourses";

export class ServiceImplementation implements ApiImplementation {
	trainingcourses: TrainingcoursesApi = TrainingCoursesServiceImpl;
}
