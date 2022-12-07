# Extraactivities

## Operations

### postExtraactivitiesCreate

```http
POST /extraactivities/create
```


### deleteExtraactivitiesDelete

```http
DELETE /extraactivities/delete
```


### getExtraactivitiesGet

```http
GET /extraactivities/get
```


### getExtraactivitiesGetAll

```http
GET /extraactivities/getAll
```


### putExtraactivitiesUpdate

```http
PUT /extraactivities/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
