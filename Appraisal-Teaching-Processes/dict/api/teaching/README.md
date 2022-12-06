# Teaching

## Operations

### postTeachingProcessCreate

```http
POST /teachingProcess/create
```


### deleteTeachingProcessDelete

```http
DELETE /teachingProcess/delete
```


### getTeachingProcessGet

```http
GET /teachingProcess/get
```


### getTeachingProcessGetAll

```http
GET /teachingProcess/getAll
```


### putTeachingProcessUpdate

```http
PUT /teachingProcess/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function postTeachingProcessCreate(request: Api.TeachingData | undefined): Promise<t.PostTeachingProcessCreateResponse> {
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

async function putTeachingProcessUpdate(id: string, request: Api.TeachingData | undefined): Promise<t.PutTeachingProcessUpdateResponse> {
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
```
