import {Router} from "express"
import * as PS from "./books.service.js"
const bookRouter = Router()
bookRouter.post("/books",PS.createBook)
bookRouter.post("/authors",PS.createAuthorImplicitly)
bookRouter.post("/logs/capped",PS.createLogsCollection)
bookRouter.post("/books/index",PS.indexing_title)
bookRouter.post("/books/batch",PS.insert_many)
bookRouter.patch("/books/Future",PS.add_future)
bookRouter.get("/books/title",PS.get_id)
bookRouter.get("/books/year",PS.book_year)
bookRouter.get("/books/genre",PS.book_genre)
bookRouter.get("/books/skip-limit",PS.book_skip_limit)
bookRouter.get("/books/year-integer",PS.book_year_number)
bookRouter.get("/books/exclude-genres",PS.book_nogenre)
bookRouter.get("/books/aggregate1",PS.aggregate1)
bookRouter.delete("/books/before-year",PS.delete1)
bookRouter.get("/books/aggregate2",PS.aggregate_projection)
bookRouter.get("/books/aggregate3",PS.aggregate_unwind)
bookRouter.get("/books/aggregate4",PS.aggregate_join)



export default bookRouter