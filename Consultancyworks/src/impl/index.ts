import { ConsultancyworksApi } from "../../dict/api/consultancyworks/types";
import { ApiImplementation } from "../../dict/types";
import { ConsultancyWorksServiceImpl } from "./consultancyworks";

export class ServiceImplementation implements ApiImplementation {
	consultancyworks: ConsultancyworksApi = ConsultancyWorksServiceImpl;
}
