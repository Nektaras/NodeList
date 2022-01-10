export default class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.showArchive = this.showArchive.bind(this);
        this.showAddRow = this.showAddRow.bind(this);
        this.addNote = this.addNote.bind(this);
        this.showEditRow = this.showEditRow.bind(this);
        this.editNote = this.editNote.bind(this);
        this.oldName;
        this.archiveNote = this.archiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.unarchiveNote = this.unarchiveNote.bind(this);
    }

    addHandle() {
        this.view.addButton.addEventListener("click", this.showAddRow);
        this.view.mainList.addEventListener("click", this.showEditRow);
        this.view.mainList.addEventListener("click", this.archiveNote);
        this.view.mainList.addEventListener("click", this.deleteNote);
        this.view.archiveList.addEventListener("click", this.showEditRow);
        this.view.archiveList.addEventListener("click", this.unarchiveNote);
        this.view.archiveList.addEventListener("click", this.deleteNote);
    }

    renderNotes() {
        if (this.model.notes) {
            this.view.renderMainTable(this.model.getFirstData());
            this.view.renderSecondTable(this.model.getSecondData());

            const archive = document.querySelectorAll(".showArchive");

            for (let i = 0; i < archive.length; i++) {
                archive[i].addEventListener("click", this.showArchive);
            }
        }
    }

    showArchive(e) {
        this.view.showArchive(this.model.getArchiveData(e));
    }

    showAddRow() {
        this.view.showAddRow();
        const addButton = document.querySelector(".addNote");
        addButton.addEventListener("click", this.addNote);
    }

    addNote() {
        let inputName = document.querySelector(".inputName").value;
        let inputContent = document.querySelector(".inputContent").value;
        let selectCategory = document.querySelector(".selectCategory").value;

        if (inputName && inputContent) this.model.addNote(inputName, inputContent, selectCategory);
        this.renderNotes();
    }

    showEditRow(e) {
        if (e.target.className !== "editButton") return;
        this.oldName = e.target.parentElement.parentElement.childNodes[0].innerText;
        this.view.showEditRow(e.target.parentElement.parentElement.parentElement, e.target.parentElement.parentElement.childNodes);
        const editButton = document.querySelector(".editNote");
        editButton.addEventListener("click", this.editNote);
    }

    editNote() {
        let newName = document.querySelector(".editName").value;
        let newContent = document.querySelector(".editContent").value;
        let newCategory = document.querySelector(".editCategory").value;

        if (newName && newContent) this.model.editNote(this.oldName, newName, newContent, newCategory);
        this.renderNotes();
        this.view.archiveList.style.display = "none";
    }

    deleteNote(e) {
        if (e.target.className !== "deleteButton") return;
        let name = e.target.parentElement.parentElement.childNodes[0].innerText;
        this.model.deleteNote(name);
        this.renderNotes();
        this.view.archiveList.style.display = "none";
    }

    archiveNote(e) {
        if (e.target.className !== "archiveButton") return;
        let name = e.target.parentElement.parentElement.childNodes[0].innerText;
        this.model.archiveNote(name);
        this.renderNotes();
    }

    unarchiveNote(e) {
        if (e.target.className !== "unarchiveButton") return;
        let name = e.target.parentElement.parentElement.childNodes[0].innerText;
        this.model.unarchiveNote(name);
        this.renderNotes();
        this.view.archiveList.style.display = "none";
    }
}