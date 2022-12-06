# Coactivities

## Operations

### postCoactivitiesCreate

```http
POST /coactivities/create
```


### deleteCoactivitiesDelete

```http
DELETE /coactivities/delete
```


### getCoactivitiesGet

```http
GET /coactivities/get
```


### getCoactivitiesGetAll

```http
GET /coactivities/getAll
```


### putCoactivitiesUpdate

```http
PUT /coactivities/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
