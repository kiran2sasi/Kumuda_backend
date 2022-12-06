import { BooksPublishedApi } from "../../dict/api/booksPublished/types";
import { ApiImplementation } from "../../dict/types";
import { BooksPublishedServiceImpl } from "./books";

export class ServiceImplementation implements ApiImplementation {
	booksPublished: BooksPublishedApi = BooksPublishedServiceImpl;
}
