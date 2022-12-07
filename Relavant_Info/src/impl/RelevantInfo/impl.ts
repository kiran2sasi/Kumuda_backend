import { Api } from "../../../dist/models";
import * as t from "../../../dist/api/relevantInfo/types";
import * as v from "../../../dist/validation";
import { db } from "../../db";

export class RelevantInfoService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "NEW-RelevantInfoS";
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
	): Promise<t.GetRelevantInfoGetAllResponse> {
		try {
			const RelevantInfosQuerySnap = await db.collection(`${this.collectionName}`).get();
			const RelevantInfos: Api.RelevantInfoDto[] = RelevantInfosQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiRelevantInfoDtoFromJson("RelevantInfos", json));
			return {
				status: 200,
				body: {
					items: RelevantInfos,
					totalCount: RelevantInfos.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get(id: string): Promise<t.GetRelevantInfoGetResponse> {
		try {
			const RelevantInfoDocSnap = await db.doc(`${this.collectionName}/${id}`).get();
			if (!RelevantInfoDocSnap.exists) {
				throw new Error("no-RelevantInfo-found");
			}
			const RelevantInfo = v.modelApiRelevantInfoDtoFromJson("RelevantInfo", RelevantInfoDocSnap.data());
			return {
				status: 200,
				body: RelevantInfo,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-RelevantInfo-found")) {
				return {
					status: 404,
					body: {
						message: "No RelevantInfo found with given id",
					},
				};
			}
			throw error;
		}
	}

	async create(request: Api.RelevantInfoDto | undefined): Promise<t.PostRelevantInfoCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const RelevantInfoRef = db.collection(`${this.collectionName}`).doc(request.SINO);
			try {
				await this._checkUserExists(request.SINO);
			} catch (error: any) {
				if (error.toString().match("no-RelevantInfo-found")) {
					await RelevantInfoRef.set({
						...request,
						isExist: true,
						id: RelevantInfoRef.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("RelevantInfo-already-exists");
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

			if (error.toString().match("RelevantInfo-already-exists")) {
				return {
					status: 422,
					body: {
						message: "RelevantInfo already exists with given SINO",
					},
				};
			}
			throw error;
		}
	}

	async update(request: Api.RelevantInfoDto | undefined): Promise<t.PutRelevantInfoUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.SINO) {
				throw new Error("no-SINO-found");
			}

			const RelevantInfoRef = db.collection(`${this.collectionName}`).doc(request.SINO);

			// checking whether RelevantInfos exists or not
			const RelevantInfoRes = await this._checkUserExists(request.SINO);
			await RelevantInfoRef.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...RelevantInfoRes,
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

	async delete(id: string): Promise<t.DeleteRelevantInfoDeleteResponse> {
		try {
			await this._checkUserExists(id);
			const RelevantInfoRef = db.collection(`${this.collectionName}`).doc(id);
			await RelevantInfoRef.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "RelevantInfo deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "RelevantInfo already deleted or no RelevantInfo found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-RelevantInfo-found");
		}
		return response.body;
	}
}
