# RelevantInfo

## Operations

### postRelevantInfoCreate

```http
POST /RelevantInfo/create
```


### deleteRelevantInfoDelete

```http
DELETE /RelevantInfo/delete
```


### getRelevantInfoGet

```http
GET /RelevantInfo/get
```


### getRelevantInfoGetAll

```http
GET /RelevantInfo/getAll
```


### putRelevantInfoUpdate

```http
PUT /RelevantInfo/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
