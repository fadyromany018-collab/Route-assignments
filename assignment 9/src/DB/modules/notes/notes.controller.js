import * as N from "./notes.service.js"
import { Router } from "express"
import {verifyToken} from "../../middlewares/auth.middlewatre.js"
const notesRouter=Router()

notesRouter.put('/replace/:noteId',verifyToken,N.replace)
notesRouter.post('/note',verifyToken,N.createNotes)
notesRouter.patch('/update/:noteId',verifyToken,N.notesUpdate)
notesRouter.patch('/all',verifyToken,N.titleUpdate)
notesRouter.delete('/delete',verifyToken,N.deleteUser)
//---------------------------------------------------------
notesRouter.get('/paginate-sort',verifyToken,N.getPaginatedNotes)
notesRouter.get('/notes/:id',verifyToken,N.getNoteById)
notesRouter.get('/notes/note-by-content',verifyToken,N.getNoteByContent)
notesRouter.get('/note-with-user', verifyToken, N.getNotesWithUser)
notesRouter.get('/aggregate', verifyToken, N.aggregateNotes)
notesRouter.delete('/notes', verifyToken, N.deleteAllNotes)
notesRouter.get('/:id', verifyToken, N.getNoteById)





export default notesRouter