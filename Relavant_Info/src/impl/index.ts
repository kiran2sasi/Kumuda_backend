import { RelevantInfoApi } from "../../dist/api/relevantInfo/types";
import { ApiImplementation } from "../../dist/types";
import { RelevantInfoServiceImpl } from "./RelevantInfo";

export class ServiceImplementation implements ApiImplementation {
	relevantInfo: RelevantInfoApi=RelevantInfoServiceImpl;
}
