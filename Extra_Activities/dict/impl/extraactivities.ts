import * as t from '../api/extraactivities/types'
import { Api } from '../models'

async function postExtraactivitiesCreate(request: Api.ExtraactivitiesDto | undefined): Promise<t.PostExtraactivitiesCreateResponse> {
	throw 'Unimplemented'
}

async function deleteExtraactivitiesDelete(id: string): Promise<t.DeleteExtraactivitiesDeleteResponse> {
	throw 'Unimplemented'
}

async function getExtraactivitiesGet(id: string): Promise<t.GetExtraactivitiesGetResponse> {
	throw 'Unimplemented'
}

async function getExtraactivitiesGetAll(limit: number | null | undefined, direction: Api.DirectionParamEnum | undefined, sortByField: string | null | undefined): Promise<t.GetExtraactivitiesGetAllResponse> {
	throw 'Unimplemented'
}

async function putExtraactivitiesUpdate(request: Api.ExtraactivitiesDto | undefined): Promise<t.PutExtraactivitiesUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.ExtraactivitiesApi = {
	postExtraactivitiesCreate,
	deleteExtraactivitiesDelete,
	getExtraactivitiesGet,
	getExtraactivitiesGetAll,
	putExtraactivitiesUpdate,
}

export default api
