import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/booksPublished/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () {}).constructor;

export class BooksPublishedService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "BooksPublished";
		this.getALL = this.getALL.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getALL (limit: number | null | undefined, direction: Api.DirectionParamEnum | 
		undefined, sortByField: string | null | undefined) : Promise<t.GetBooksPublishedGetAllResponse> {
		try {
			const BooksPublishedQuerySnap = await db.collection(`${this.collectionName}`).get();
			const BooksPublished: Api.BooksPublishedDto[] = BooksPublishedQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiBooksPublishedDtoFromJson("BooksPublished", json));
			return {
				status: 200,
				body: {
					items: BooksPublished,
					totalCount: BooksPublished.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (siNo: string) : Promise<t.GetBooksPublishedGetResponse> {
		try {
			const BooksPublishedDocSnap = await db.doc(`${this.collectionName}/${siNo}`).get();
			if (!BooksPublishedDocSnap.exists) {
				throw new Error("no-BooksPublished-found");
			}
			const BooksPublished = v.modelApiBooksPublishedDtoFromJson("BooksPublished", BooksPublishedDocSnap.data());
			return {
				status: 200,
				body: BooksPublished,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-BooksPublished-found")) {
				return {
					status: 404,
					body: {
						message: "No BooksPublished found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post (request: Api.BooksPublishedDto | undefined) : Promise<t.PostBooksPublishedCreateResponse> {
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
				if (error.toString().match("no-BooksPublished-found")) {
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
			throw new Error("BooksPublished-already-exists");
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

			if (error.toString().match("BooksPublished-already-exists")) {
				return {
					status: 422,
					body: {
						message: "BooksPublished already exists with given siNo",
					},
				};
			}
			throw error;
		}
	}

	async put (siNo: string, request: Api.BooksPublishedDto | undefined) : Promise<t.PutBooksPublishedUpdateResponse> {
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

	async delete (siNo: string) : Promise<t.DeleteBooksPublishedDeleteResponse> {
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
					message: "BooksPublished deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "BooksPublished already deleted or no BooksPublished found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(siNo: string) {
		const response = await this.get(siNo);
		if (response.status === 404) {
			throw new Error("no-BooksPublished-found");
		}
		return response.body;
	}
}