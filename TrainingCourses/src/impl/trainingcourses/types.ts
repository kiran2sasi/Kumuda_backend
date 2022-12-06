import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/trainingcourses/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";
const AsyncFunction = (async function () {}).constructor;

export class TrainingCoursesService {
	private readonly collectionName: string;
	

	constructor() {
		this.collectionName = "TrainingCourses";
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
		undefined, sortByField: string | null | undefined) : Promise<t.GetTrainingCoursesGetAllResponse>
	{
		try {
			const TrainingCoursesQuerySnap = await db.collection(`${this.collectionName}`).get();
			const TrainingCourses: Api.TrainingCoursesDto[] = TrainingCoursesQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiTrainingCoursesDtoFromJson("TrainingCourses", json));
			return {
				status: 200,
				body: {
					items: TrainingCourses,
					totalCount: TrainingCourses.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get (siNo: string) : Promise<t.GetTrainingCoursesGetResponse>
	{
		try {
			const TrainingCoursesQuerySnap = await db.doc(`${this.collectionName}/${siNo}`).get();
			if (!TrainingCoursesQuerySnap.exists) {
				throw new Error("no-TrainingCourses-Process-found");
			}
			const TrainingCourses = v.modelApiTrainingCoursesDtoFromJson("TrainingCourses", TrainingCoursesQuerySnap.data());
			return {
				status: 200,
				body: TrainingCourses,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-TrainingCourses-Process-found")) {
				return {
					status: 404,
					body: {
						message: "No TrainingCourses Process found with given id",
					},
				};
			}
			throw error;
		}
	}


	async 	post (request: Api.TrainingCoursesDto | undefined) : Promise<t.PostTrainingCoursesCreateResponse>
	{
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
				if (error.toString().match("no-TrainingCourses-Process-found")) {
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
			throw new Error("TrainingCourses-Process-already-exists");
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

			if (error.toString().match("TrainingCourses-Process-already-exists")) {
				return {
					status: 422,
					body: {
						message: "TrainingCourses Process already exists with given uid",
					},
				};
			}
			throw error;
		}
	}

	async 	put (siNo: string, request: Api.TrainingCoursesDto | undefined) : Promise<t.PutTrainingCoursesUpdateResponse>
	{
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.siNo) {
				throw new Error("no-SiNo-found");
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

	async 	delete (siNo: string) : Promise<t.DeleteTrainingCoursesDeleteResponse>
	{
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
					message: "TrainingCourses Process deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "TrainingCourses Process already deleted or no TrainingCourses Process found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(siNo: string) {
		const response = await this.get(siNo);
		if (response.status === 404) {
			throw new Error("no-TrainingCourses-Process-found");
		}
		return response.body;
	}
}