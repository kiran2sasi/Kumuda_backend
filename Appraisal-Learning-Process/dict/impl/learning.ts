import * as t from '../api/learning/types'
import { Api } from '../models'

async function postLearningProcessCreate(request: Api.LearningData | undefined): Promise<t.PostLearningProcessCreateResponse> {
	throw 'Unimplemented'
}

async function deleteLearningProcessDelete(id: string): Promise<t.DeleteLearningProcessDeleteResponse> {
	throw 'Unimplemented'
}

async function getLearningProcessGet(id: string): Promise<t.GetLearningProcessGetResponse> {
	throw 'Unimplemented'
}

async function getLearningProcessGetAll(): Promise<t.GetLearningProcessGetAllResponse> {
	throw 'Unimplemented'
}

async function putLearningProcessUpdate(id: string, request: Api.LearningData | undefined): Promise<t.PutLearningProcessUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.LearningApi = {
	postLearningProcessCreate,
	deleteLearningProcessDelete,
	getLearningProcessGet,
	getLearningProcessGetAll,
	putLearningProcessUpdate,
}

export default api
