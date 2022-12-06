# RelevantData

## Operations

### postRelevantDataCreate

```http
POST /relevantData/create
```


### deleteRelevantDataDelete

```http
DELETE /relevantData/delete
```


### getRelevantDataGet

```http
GET /relevantData/get
```


### getRelevantDataGetAll

```http
GET /relevantData/getAll
```


### putRelevantDataUpdate

```http
PUT /relevantData/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
