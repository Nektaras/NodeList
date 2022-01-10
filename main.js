import NoteView from "./NoteView";
import NoteController from "./NoteController";
import NoteModel from "./NoteModel";

document.addEventListener("DOMContentLoaded", () => {
    const view = new NoteView();
    const model = new NoteModel();
    const controller = new NoteController(model, view);
    controller.renderNotes();
    controller.addHandle();
})