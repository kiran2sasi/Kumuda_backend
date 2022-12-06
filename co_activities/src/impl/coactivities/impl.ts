import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/coactivities/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";

export class CoactivitiesService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "NEW-Coactivities";
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
	): Promise<t.GetCoactivitiesGetAllResponse> {
		try {
			const CoactivitiesQuerySnap = await db.collection(`${this.collectionName}`).get();
			const Coactivities: Api.CoactivitiesDto[] = CoactivitiesQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiCoactivitiesDtoFromJson("Coactivities", json));
			return {
				status: 200,
				body: {
					items: Coactivities,
					totalCount: Coactivities.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get(SINO: string): Promise<t.GetCoactivitiesGetResponse> {
		try {
			const coactivitiesDocSnap = await db.doc(`${this.collectionName}/${SINO}`).get();
			if (!coactivitiesDocSnap.exists) {
				throw new Error("no-coactivities-found");
			}
			const coactivities = v.modelApiCoactivitiesDtoFromJson("coactivities", coactivitiesDocSnap.data());
			return {
				status: 200,
				body: coactivities,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-coactivities-found")) {
				return {
					status: 404,
					body: {
						message: "No coactivities found with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async create(request: Api.CoactivitiesDto | undefined): Promise<t.PostCoactivitiesCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const coactivitiesRef = db.collection(`${this.collectionName}`).doc(request.SINO);
			try {
				await this._checkUserExists(request.SINO);
			} catch (error: any) {
				if (error.toString().match("no-coactivities-found")) {
					await coactivitiesRef.set({
						...request,
						isExist: true,
						SINO: coactivitiesRef.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("coactivities-already-exists");
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

			if (error.toString().match("coactivities-already-exists")) {
				return {
					status: 422,
					body: {
						message: "coactivities already exists with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async update(request: Api.CoactivitiesDto | undefined): Promise<t.PutCoactivitiesUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const coactivitiesRef = db.collection(`${this.collectionName}`).doc(request.SINO);

			// checking whether Coactivities exists or not
			const coactivitiesRes = await this._checkUserExists(request.SINO);
			await coactivitiesRef.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...coactivitiesRes,
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

	async delete(SINO: string): Promise<t.DeleteCoactivitiesDeleteResponse> {
		try {
			await this._checkUserExists(SINO);
			const coactivitiesRef = db.collection(`${this.collectionName}`).doc(SINO);
			await coactivitiesRef.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "coactivities deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "coactivities already deleted or no coactivities found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(SINO: string) {
		const response = await this.get(SINO);
		if (response.status === 404) {
			throw new Error("no-coactivities-found");
		}
		return response.body;
	}
}
