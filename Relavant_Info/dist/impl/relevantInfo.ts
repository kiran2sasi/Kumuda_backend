import * as t from '../api/relevantInfo/types'
import { Api } from '../models'

async function postRelevantInfoCreate(request: Api.RelevantInfoDto | undefined): Promise<t.PostRelevantInfoCreateResponse> {
	throw 'Unimplemented'
}

async function deleteRelevantInfoDelete(id: string): Promise<t.DeleteRelevantInfoDeleteResponse> {
	throw 'Unimplemented'
}

async function getRelevantInfoGet(id: string): Promise<t.GetRelevantInfoGetResponse> {
	throw 'Unimplemented'
}

async function getRelevantInfoGetAll(limit: number | null | undefined, direction: Api.DirectionParamEnum | undefined, sortByField: string | null | undefined): Promise<t.GetRelevantInfoGetAllResponse> {
	throw 'Unimplemented'
}

async function putRelevantInfoUpdate(request: Api.RelevantInfoDto | undefined): Promise<t.PutRelevantInfoUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.RelevantInfoApi = {
	postRelevantInfoCreate,
	deleteRelevantInfoDelete,
	getRelevantInfoGet,
	getRelevantInfoGetAll,
	putRelevantInfoUpdate,
}

export default api
