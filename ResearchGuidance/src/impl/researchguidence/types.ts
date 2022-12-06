import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/researchguidance/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () {}).constructor;

export class ResearchGuidanceService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "ResearchGuidance";
		this.getALL = this.getALL.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getALL (limit: number | null | undefined, direction: Api.DirectionParamEnum
         | undefined, sortByField: string | null | undefined) : Promise<t.GetResearchGuidanceGetAllResponse> {
		try {
			const ResearchGuidanceQuerySnap = await db.collection(`${this.collectionName}`).get();
			const ResearchGuidance: Api.ResearchGuidanceDto[] = ResearchGuidanceQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiResearchGuidanceDtoFromJson("ResearchGuidance", json));
			return {
				status: 200,
				body: {
					items: ResearchGuidance,
					totalCount: ResearchGuidance.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (siNo: string) : Promise<t.GetResearchGuidanceGetResponse> {
		try {
			const ResearchGuidanceDocSnap = await db.doc(`${this.collectionName}/${siNo}`).get();
			if (!ResearchGuidanceDocSnap.exists) {
				throw new Error("no-ResearchGuidance-found");
			}
			const ResearchGuidance = v.modelApiResearchGuidanceDtoFromJson("ResearchGuidance", ResearchGuidanceDocSnap.data());
			return {
				status: 200,
				body: ResearchGuidance,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-ResearchGuidance-found")) {
				return {
					status: 404,
					body: {
						message: "No ResearchGuidance found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post (request: Api.ResearchGuidanceDto 
        | undefined) : Promise<t.PostResearchGuidanceCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.siNo) {
				throw new Error("no-siNo-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.siNo);
			try {
				await this._checkUserExists(request.siNo);
			} catch (error: any) {
				if (error.toString().match("no-ResearchGuidance-found")) {
					await Ref.set({
						...request,
						isExist: true,
						id: Ref.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("ResearchGuidance-already-exists");
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "Invalid request",
					},
				};
			}

			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "No siNo found in request",
					},
				};
			}

			if (error.toString().match("ResearchGuidance-already-exists")) {
				return {
					status: 422,
					body: {
						message: "ResearchGuidance already exists with given siNo",
					},
				};
			}
			throw error;
		}
	}

	async put (siNo: string, request: Api.ResearchGuidanceDto | undefined) : Promise<t.PutResearchGuidanceUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.siNo) {
				throw new Error("no-siNo-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.siNo);

			// checking whether BP_patients exists or not
			const Res = await this._checkUserExists(request.siNo);
			await Ref.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...Res,
					...request,
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "Invalid request",
					},
				};
			}

			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "No siNo found in request",
					},
				};
			}

			throw error;
		}
	}

	async delete (siNo: string) : Promise<t.DeleteResearchGuidanceDeleteResponse> {
		try {
			await this._checkUserExists(siNo);
			const Ref = db.collection(`${this.collectionName}`).doc(siNo);
			await Ref.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "ResearchGuidance deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "ResearchGuidance already deleted or no ResearchGuidance found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(siNo: string) {
		const response = await this.get(siNo);
		if (response.status === 404) {
			throw new Error("no-ResearchGuidance-found");
		}
		return response.body;
	}
}