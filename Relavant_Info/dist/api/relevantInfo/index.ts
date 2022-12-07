/* eslint-disable */
// tslint:disable
/**
 * Service
 * Service
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */

import { Express } from 'express'
import passport from 'passport'
import * as t from './types'
import * as v from '../../validation'
import { Api } from '../../models'

export default function(app: Express, impl: t.RelevantInfoApi) {
	app.post(
		'/RelevantInfo/create',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiRelevantInfoDtoFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.postRelevantInfoCreate(__body()).then(function (response) {
					if (response.status === 201) {
						let body: any
						try {
							body = v.modelApiRelevantInfoDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.postRelevantInfoCreate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(201)
						res.send(body)
						return
					}
					if (response.status === 401) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.postRelevantInfoCreate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(401)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.postRelevantInfoCreate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 422) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.postRelevantInfoCreate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(422)
						res.send(body)
						return
					}

					console.log('Unsupported response in relevantInfo.postRelevantInfoCreate', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in relevantInfo.postRelevantInfoCreate', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.delete(
		'/RelevantInfo/delete',
		function (req, res) {
			try {
				impl.deleteRelevantInfoDelete(v.parseString('query.Id', req.query['Id'])).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.deleteRelevantInfoDelete', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 401) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.deleteRelevantInfoDelete', error)
							res.status(500)
							res.send()
							return
						}

						res.status(401)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.deleteRelevantInfoDelete', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 422) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.deleteRelevantInfoDelete', error)
							res.status(500)
							res.send()
							return
						}

						res.status(422)
						res.send(body)
						return
					}

					console.log('Unsupported response in relevantInfo.deleteRelevantInfoDelete', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in relevantInfo.deleteRelevantInfoDelete', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.get(
		'/RelevantInfo/get',
		function (req, res) {
			try {
				impl.getRelevantInfoGet(v.parseString('query.Id', req.query['Id'])).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiRelevantInfoDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGet', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 401) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGet', error)
							res.status(500)
							res.send()
							return
						}

						res.status(401)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGet', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 422) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGet', error)
							res.status(500)
							res.send()
							return
						}

						res.status(422)
						res.send(body)
						return
					}

					console.log('Unsupported response in relevantInfo.getRelevantInfoGet', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in relevantInfo.getRelevantInfoGet', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.get(
		'/RelevantInfo/getAll',
		function (req, res) {
			try {
				impl.getRelevantInfoGetAll(v.allowUndefined(v.parseInteger)('query.Limit', req.query['Limit']), v.allowUndefined(v.enumApiDirectionParamEnumFromJson)('query.Direction', req.query['Direction']), v.allowUndefined(v.parseString)('query.SortByField', req.query['SortByField'])).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiRelevantInfoPagedResultDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGetAll', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 401) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGetAll', error)
							res.status(500)
							res.send()
							return
						}

						res.status(401)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.getRelevantInfoGetAll', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}

					console.log('Unsupported response in relevantInfo.getRelevantInfoGetAll', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in relevantInfo.getRelevantInfoGetAll', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.put(
		'/RelevantInfo/update',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiRelevantInfoDtoFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.putRelevantInfoUpdate(__body()).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiRelevantInfoDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.putRelevantInfoUpdate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 401) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.putRelevantInfoUpdate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(401)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.putRelevantInfoUpdate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 422) {
						let body: any
						try {
							body = v.modelApiMessageDtoToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in relevantInfo.putRelevantInfoUpdate', error)
							res.status(500)
							res.send()
							return
						}

						res.status(422)
						res.send(body)
						return
					}

					console.log('Unsupported response in relevantInfo.putRelevantInfoUpdate', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in relevantInfo.putRelevantInfoUpdate', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

}
