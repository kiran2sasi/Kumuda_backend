import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/fullpaper/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () { }).constructor;

export class fullpaperService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "FullPapersPublished";
		this.getALL = this.getALL.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getALL () : Promise<t.GetFullPapersPublishedResponse> {
		try {
			const FullpapersDataQuerySnap = await db.collection(`${this.collectionName}`).get();
			const fullpapaersTem: Api.FullpapersData[] = FullpapersDataQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiFullpapersDataFromJson("FullpapersData", json));
			return {
				status: 200,
				body: {
					items: fullpapaersTem,
					totalCount: fullpapaersTem.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (facultyname: string) : Promise<t.GetGetFullPapersPublishedResponse> {
		try {
			const FullpapersDataSnap = await db.doc(`${this.collectionName}/${facultyname}`).get();
			if (!FullpapersDataSnap.exists) {
				throw new Error("no-Appointment-found");
			}
			const FullpapersData = v.modelApiFullpapersDataFromJson("FullpapersData", FullpapersDataSnap.data());
			return {
				status: 200,
				body: FullpapersData,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-FullpapersData-found")) {
				return {
					status: 404,
					body: {
						message: "No FullpapersData found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post (request: Api.FullpapersData | undefined) : Promise<t.CreateFullPapersPublishedResponse>{
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.Facultyname) {
				throw new Error("no-facultyname-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.Facultyname);
			try {
				await this._checkUserExists(request.Facultyname);
			} catch (error: any) {
				if (error.toString().match("no-FullpapersData-found")) {
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
			throw new Error("FullpapersData-already-exists");
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

			if (error.toString().match("FullpapersData-already-exists")) {
				return {
					status: 422,
					body: {
						message: "FullpapersData already exists with given uid",
					},
				};
			}
			throw error;
		}
	}

	async put (facultyname: string, request: Api.FullpapersData | undefined) : Promise<t.UpdateFullPapersPublishedResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.Facultyname) {
				throw new Error("no-facultyname-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.Facultyname);

			// checking whether BP_patients exists or not
			const Res = await this._checkUserExists(request.Facultyname);
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
						message: "No facultyname found in request",
					},
				};
			}

			throw error;
		}
	}

	async delete (facultyname: string) : Promise<t.DeleteFullPapersPublishedResponse> {
		try {
			await this._checkUserExists(facultyname);
			const Ref = db.collection(`${this.collectionName}`).doc(facultyname);
			await Ref.update({
				isExist: false,
				deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "FullpapersData deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "FullpapersData already deleted or no FullpapersData found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-FullpapersData-found");
		}
		return response.body;
	}
}