/* eslint-disable */
// tslint:disable
/**
 * service
 * service
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */

import { Express } from 'express'
import extraactivities from './api/extraactivities'
import * as t from './types'

export default function(app: Express, impl: t.ApiImplementation) {
	extraactivities(app, impl.extraactivities)
}
