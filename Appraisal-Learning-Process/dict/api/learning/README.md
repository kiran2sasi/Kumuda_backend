# Learning

## Operations

### postLearningProcessCreate

```http
POST /learningProcess/create
```


### deleteLearningProcessDelete

```http
DELETE /learningProcess/delete
```


### getLearningProcessGet

```http
GET /learningProcess/get
```


### getLearningProcessGetAll

```http
GET /learningProcess/getAll
```


### putLearningProcessUpdate

```http
PUT /learningProcess/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function postLearningProcessCreate(request: Api.LearningData | undefined): Promise<t.PostLearningProcessCreateResponse> {
	throw 'Unimplemented'
}

async function deleteLearningProcessDelete(id: string): Promise<t.DeleteLearningProcessDeleteResponse> {
	throw 'Unimplemented'
}

async function getLearningProcessGet(id: string): Promise<t.GetLearningProcessGetResponse> {
	throw 'Unimplemented'
}

async function getLearningProcessGetAll(): Promise<t.GetLearningProcessGetAllResponse> {
	throw 'Unimplemented'
}

async function putLearningProcessUpdate(id: string, request: Api.LearningData | undefined): Promise<t.PutLearningProcessUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.LearningApi = {
	postLearningProcessCreate,
	deleteLearningProcessDelete,
	getLearningProcessGet,
	getLearningProcessGetAll,
	putLearningProcessUpdate,
}

export default api
```
