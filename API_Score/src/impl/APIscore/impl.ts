import { Api } from "../../../dist/models";
import * as t from "../../../dist/api/apIscore/types";
import * as v from "../../../dist/validation";
import { db } from "../../db";

export class APIscorService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "NEW-APIscoreS";
		this.getAll = this.getAll.bind(this);
		this.get = this.get.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getAll(
		limit: number | null | undefined,
		direction: Api.DirectionParamEnum | undefined,
		sortByField: string | null | undefined
	): Promise<t.GetAPIscoreGetAllResponse> {
		try {
			const APIscoresQuerySnap = await db.collection(`${this.collectionName}`).get();
			const APIscores: Api.APIscoreDto[] = APIscoresQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiAPIscoreDtoFromJson("APIscores", json));
			return {
				status: 200,
				body: {
					items: APIscores,
					totalCount: APIscores.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get(id: string): Promise<t.GetAPIscoreGetResponse> {
		try {
			const APIscoreDocSnap = await db.doc(`${this.collectionName}/${id}`).get();
			if (!APIscoreDocSnap.exists) {
				throw new Error("no-APIscore-found");
			}
			const APIscore = v.modelApiAPIscoreDtoFromJson("APIscore", APIscoreDocSnap.data());
			return {
				status: 200,
				body: APIscore,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-APIscore-found")) {
				return {
					status: 404,
					body: {
						message: "No APIscore found with given id",
					},
				};
			}
			throw error;
		}
	}

	async create(request: Api.APIscoreDto | undefined): Promise<t.PostAPIscoreCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const APIscoreRef = db.collection(`${this.collectionName}`).doc(request.SINO);
			try {
				await this._checkUserExists(request.SINO);
			} catch (error: any) {
				if (error.toString().match("no-APIscore-found")) {
					await APIscoreRef.set({
						...request,
						isExist: true,
						id: APIscoreRef.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("APIscore-already-exists");
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
						message: "No SINO found in request",
					},
				};
			}

			if (error.toString().match("APIscore-already-exists")) {
				return {
					status: 422,
					body: {
						message: "APIscore already exists with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async update(request: Api.APIscoreDto | undefined): Promise<t.PutAPIscoreUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const APIscoreRef = db.collection(`${this.collectionName}`).doc(request.SINO);

			// checking whether APIscores exists or not
			const APIscoreRes = await this._checkUserExists(request.SINO);
			await APIscoreRef.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...APIscoreRes,
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
						message: "No SINO found in request",
					},
				};
			}

			throw error;
		}
	}

	async delete(id: string): Promise<t.DeleteAPIscoreDeleteResponse> {
		try {
			await this._checkUserExists(id);
			const APIscoreRef = db.collection(`${this.collectionName}`).doc(id);
			await APIscoreRef.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "APIscore deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "APIscore already deleted or no APIscore found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-APIscore-found");
		}
		return response.body;
	}
}
