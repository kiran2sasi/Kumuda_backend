import * as t from '../api/teaching/types'
import { Api } from '../models'

async function postTeachingProcessCreate(request: Api.AppraisalData | undefined): Promise<t.PostTeachingProcessCreateResponse> {
	throw 'Unimplemented'
}

async function deleteTeachingProcessDelete(id: string): Promise<t.DeleteTeachingProcessDeleteResponse> {
	throw 'Unimplemented'
}

async function getTeachingProcessGet(id: string): Promise<t.GetTeachingProcessGetResponse> {
	throw 'Unimplemented'
}

async function getTeachingProcessGetAll(): Promise<t.GetTeachingProcessGetAllResponse> {
	throw 'Unimplemented'
}

async function putTeachingProcessUpdate(id: string, request: Api.AppraisalData | undefined): Promise<t.PutTeachingProcessUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.TeachingApi = {
	postTeachingProcessCreate,
	deleteTeachingProcessDelete,
	getTeachingProcessGet,
	getTeachingProcessGetAll,
	putTeachingProcessUpdate,
}

export default api
