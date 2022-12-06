import * as t from '../api/coactivities/types'
import { Api } from '../models'

async function postCoactivitiesCreate(request: Api.CoactivitiesDto | undefined): Promise<t.PostCoactivitiesCreateResponse> {
	throw 'Unimplemented'
}

async function deleteCoactivitiesDelete(id: string): Promise<t.DeleteCoactivitiesDeleteResponse> {
	throw 'Unimplemented'
}

async function getCoactivitiesGet(id: string): Promise<t.GetCoactivitiesGetResponse> {
	throw 'Unimplemented'
}

async function getCoactivitiesGetAll(limit: number | null | undefined, direction: Api.DirectionParamEnum | undefined, sortByField: string | null | undefined): Promise<t.GetCoactivitiesGetAllResponse> {
	throw 'Unimplemented'
}

async function putCoactivitiesUpdate(request: Api.CoactivitiesDto | undefined): Promise<t.PutCoactivitiesUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.CoactivitiesApi = {
	postCoactivitiesCreate,
	deleteCoactivitiesDelete,
	getCoactivitiesGet,
	getCoactivitiesGetAll,
	putCoactivitiesUpdate,
}

export default api
