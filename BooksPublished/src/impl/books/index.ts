import { BooksPublishedService } from "./types";
import * as t from "../../../dict/api/booksPublished/types";

const service = new BooksPublishedService();

export const BooksPublishedServiceImpl: t.BooksPublishedApi = {
	postBooksPublishedCreate: service.post,
	deleteBooksPublishedDelete: service.delete,
	getBooksPublishedGet: service.get,
	getBooksPublishedGetAll: service.getALL,
	putBooksPublishedUpdate: service.put,
};
