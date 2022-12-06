import * as t from '../api/relevantData/types'
import { Api } from '../models'

async function postRelevantDataCreate(request: Api.RelevantDataDto | undefined): Promise<t.PostRelevantDataCreateResponse> {
	throw 'Unimplemented'
}

async function deleteRelevantDataDelete(id: string): Promise<t.DeleteRelevantDataDeleteResponse> {
	throw 'Unimplemented'
}

async function getRelevantDataGet(id: string): Promise<t.GetRelevantDataGetResponse> {
	throw 'Unimplemented'
}

async function getRelevantDataGetAll(): Promise<t.GetRelevantDataGetAllResponse> {
	throw 'Unimplemented'
}

async function putRelevantDataUpdate(id: string, request: Api.RelevantDataDto | undefined): Promise<t.PutRelevantDataUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.RelevantDataApi = {
	postRelevantDataCreate,
	deleteRelevantDataDelete,
	getRelevantDataGet,
	getRelevantDataGetAll,
	putRelevantDataUpdate,
}

export default api
