import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/examDuties/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () {}).constructor;

export class AppraisalService {
	private readonly collectionName: string;
	

	constructor() {
		this.collectionName = "EXAMDUTIES";
		this.getAll = this.getAll.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getAll () : Promise<t.GetExamDutiesGetAllResponse> {
		try {
			const ExamDutiesQuerySnap = await db.collection(`${this.collectionName}`).get();
			const ExamDutiesTem: Api.ExamDutiesData[] = ExamDutiesQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiExamDutiesDataFromJson("EXAMDUTIESPROCESS", json));
			return {
				status: 200,
				body: {
					items: ExamDutiesTem,
					totalCount: ExamDutiesTem.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (id: string) : Promise<t.GetExamDutiesGetResponse> {
		try {
			const ExamDutiesQuerySnap = await db.doc(`${this.collectionName}/${id}`).get();
			if (!ExamDutiesQuerySnap.exists) {
				throw new Error("no-Exam-Duties-Process-found");
			}
			const ExamDuties = v.modelApiExamDutiesDataFromJson("ExamDuties", ExamDutiesQuerySnap.data());
			return {
				status: 200,
				body: ExamDuties,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-Exam-Duties-Process-found")) {
				return {
					status: 404,
					body: {
						message: "No Exam-Duties Process found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post (request: Api.ExamDutiesData | undefined) : Promise<t.PostExamDutiesCreateResponse> {
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
				if (error.toString().match("no-Exam-Duties-Process-found")) {
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
			throw new Error("Exam-Duties-Process-already-exists");
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

			if (error.toString().match("Exam-Duties-Process-already-exists")) {
				return {
					status: 422,
					body: {
						message: "Exam Duties Process already exists with given uid",
					},
				};
			}
			throw error;
		}
	}

	async put (id: string, request: Api.ExamDutiesData | undefined) : Promise<t.PutExamDutiesUpdateResponse> {
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

	async delete (id: string) : Promise<t.DeleteExamDutiesDeleteResponse> {
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
					message: "Exam Duties Process deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "Exam Duties Process already deleted or no ExamDuties Process found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-Exam-Duties-Process-found");
		}
		return response.body;
	}
}