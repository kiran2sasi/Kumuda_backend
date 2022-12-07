import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/extraactivities/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";

export class extraactivitiesService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "NEW-extraactivities";
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
	): Promise<t.GetExtraactivitiesGetAllResponse> {
		try {
			const extraactivitiesQuerySnap = await db.collection(`${this.collectionName}`).get();
			const extraactivities: Api.ExtraactivitiesDto[] = extraactivitiesQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiExtraactivitiesDtoFromJson("extraactivities", json));
			return {
				status: 200,
				body: {
					items: extraactivities,
					totalCount: extraactivities.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get(SINO: string): Promise<t.GetExtraactivitiesGetResponse> {
		try {
			const extraactivitiesDocSnap = await db.doc(`${this.collectionName}/${SINO}`).get();
			if (!extraactivitiesDocSnap.exists) {
				throw new Error("no-extraactivities-found");
			}
			const extraactivities = v.modelApiExtraactivitiesDtoFromJson("extraactivities", extraactivitiesDocSnap.data());
			return {
				status: 200,
				body: extraactivities,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-extraactivities-found")) {
				return {
					status: 404,
					body: {
						message: "No extraactivities found with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async create(request: Api.ExtraactivitiesDto | undefined): Promise<t.PostExtraactivitiesCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const extraactivitiesRef = db.collection(`${this.collectionName}`).doc(request.SINO);
			try {
				await this._checkUserExists(request.SINO);
			} catch (error: any) {
				if (error.toString().match("no-extraactivities-found")) {
					await extraactivitiesRef.set({
						...request,
						isExist: true,
						SINO: extraactivitiesRef.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("extraactivities-already-exists");
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

			if (error.toString().match("extraactivities-already-exists")) {
				return {
					status: 422,
					body: {
						message: "extraactivities already exists with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async update(request: Api.ExtraactivitiesDto | undefined): Promise<t.PutExtraactivitiesUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const extraactivitiesRef = db.collection(`${this.collectionName}`).doc(request.SINO);

			// checking whether extraactivities exists or not
			const extraactivitiesRes = await this._checkUserExists(request.SINO);
			await extraactivitiesRef.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...extraactivitiesRes,
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

	async delete(SINO: string): Promise<t.DeleteExtraactivitiesDeleteResponse> {
		try {
			await this._checkUserExists(SINO);
			const extraactivitiesRef = db.collection(`${this.collectionName}`).doc(SINO);
			await extraactivitiesRef.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "extraactivities deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "extraactivities already deleted or no extraactivities found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(SINO: string) {
		const response = await this.get(SINO);
		if (response.status === 404) {
			throw new Error("no-extraactivities-found");
		}
		return response.body;
	}
}
