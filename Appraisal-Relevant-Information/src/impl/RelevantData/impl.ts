import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/relevantData/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () {}).constructor;

export class AppraisalService {
	private readonly collectionName: string;
	

	constructor() {
		this.collectionName = "RELEVANTDATA";
		this.getAll = this.getAll.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getAll () : Promise<t.GetRelevantDataGetAllResponse> {
		try {
			const RelevantDataQuerySnap = await db.collection(`${this.collectionName}`).get();
			const RelevantDataTem: Api.RelevantDataDto[] = RelevantDataQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiRelevantDataDtoFromJson("RELEVANTDATAPROCESS", json));
			return {
				status: 200,
				body: {
					items: RelevantDataTem,
					totalCount: RelevantDataTem.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (id: string) : Promise<t.GetRelevantDataGetResponse> {
		try {
			const RelevantDataQuerySnap = await db.doc(`${this.collectionName}/${id}`).get();
			if (!RelevantDataQuerySnap.exists) {
				throw new Error("no-Relevant-Data-Process-found");
			}
			const RelevantData = v.modelApiRelevantDataDtoFromJson("RelevantData", RelevantDataQuerySnap.data());
			return {
				status: 200,
				body: RelevantData,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-Relevant-Data-Process-found")) {
				return {
					status: 404,
					body: {
						message: "No Relevant Data Process found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post (request: Api.RelevantDataDto | undefined) : Promise<t.PostRelevantDataCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.siNo) {
				throw new Error("no-uId-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.siNo);
			try {
				await this._checkUserExists(request.siNo);
			} catch (error: any) {
				if (error.toString().match("no-Relevant-Data-Process-found")) {
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
			throw new Error("Relevant-Data-Process-already-exists");
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
						message: "No id found in request",
					},
				};
			}

			if (error.toString().match("Relevant-Data-Process-already-exists")) {
				return {
					status: 422,
					body: {
						message: "Relevant Data Process already exists with given uid",
					},
				};
			}
			throw error;
		}
	}

	async put (id: string, request: Api.RelevantDataDto | undefined) : Promise<t.PutRelevantDataUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.siNo) {
				throw new Error("no-uId-found");
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
						message: "No id found in request",
					},
				};
			}

			throw error;
		}
	}

	async delete (id: string) : Promise<t.DeleteRelevantDataDeleteResponse> {
		try {
			await this._checkUserExists(id);
			const Ref = db.collection(`${this.collectionName}`).doc(id);
			await Ref.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "Relevant Data Process deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "Relevant Data Process already deleted or no Relevant Data Process found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-Relevant-Data-Process-found");
		}
		return response.body;
	}
}