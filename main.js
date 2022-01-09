document.addEventListener("DOMContentLoaded", () => {
    const view = new NoteView();
    const model = new NoteModel();
    const controller = new NoteController(model, view);
    controller.renderNotes();
    controller.addHandle();
})

class NoteView {
    constructor() {
        this.mainList = document.querySelector("#mainList");
        this.secondList = document.querySelector("#secondaryList");
        this.archiveList = document.querySelector("#archiveList");
        this.addButton = document.querySelector(".createNoteButton");
    }

    renderNote(note) {
        const name = document.createElement("td");
        const created = document.createElement("td");
        const category = document.createElement("td");
        const content = document.createElement("td");
        const dates = document.createElement("td");

        name.innerText = note.name;
        created.innerText = note.created;
        category.innerText = note.category;
        content.innerText = note.content;
        dates.innerText = "--------------";

        let regArr = note.content.match(/(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g);

        if (regArr) {
            dates.innerText = "";
            for (let i = 0; i < regArr.length; i++) {
                dates.innerText += regArr[i] + "; ";
            }
        }

        return [name, created, category, content, dates];
    }

    renderMainTable(array) {
        while (this.mainList.childNodes.length > 2) {
            this.mainList.removeChild(this.mainList.lastChild);
        }
        array.forEach(note => {
            const row = document.createElement("tr");
            const actions = document.createElement("td");
            let [name, created, category, content, dates] = this.renderNote(note);


            const editButton = document.createElement("button");
            editButton.className = "editButton";
            editButton.appendChild(document.createTextNode("Edit"));

            const archiveButton = document.createElement("button");
            archiveButton.className = "archiveButton";
            archiveButton.appendChild(document.createTextNode("Archive"));

            const deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.appendChild(document.createTextNode("Delete"));

            actions.append(editButton, archiveButton, deleteButton);
            row.append(name, created, category, content, dates, actions);
            this.mainList.appendChild(row);
        });
    }

    renderSecondTable(array) {
        while (this.secondList.childNodes.length > 2) {
            this.secondList.removeChild(this.secondList.lastChild);
        }
        array.forEach(category => {
            const row = document.createElement("tr");
            const name = document.createElement("td");
            const active = document.createElement("td");
            const archived = document.createElement("td");
            archived.style.cursor = "pointer";
            archived.style.textDecoration = "underline";
            archived.className = "showArchive";

            name.innerText = category.category;
            active.innerText = category.active;
            archived.innerText = category.archived;

            row.append(name, active, archived);
            this.secondList.appendChild(row);
        });
    }

    showArchive(array) {
        while (this.archiveList.childNodes.length > 2) {
            this.archiveList.removeChild(this.archiveList.lastChild);
        }
        array.forEach(note => {
            const row = document.createElement("tr");
            const actions = document.createElement("td");
            let [name, created, category, content, dates] = this.renderNote(note);


            const editButton = document.createElement("button");
            editButton.className = "editButton";
            editButton.appendChild(document.createTextNode("Edit"));

            const unarchiveButton = document.createElement("button");
            unarchiveButton.className = "unarchiveButton";
            unarchiveButton.appendChild(document.createTextNode("Unarchive"));

            const deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.appendChild(document.createTextNode("Delete"));

            actions.append(editButton, unarchiveButton, deleteButton);
            row.append(name, created, category, content, dates, actions);
            this.archiveList.appendChild(row);
            this.archiveList.style.display = "block";
        });
    }

    showAddRow() {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const created = document.createElement("td");
        const category = document.createElement("td");
        const content = document.createElement("td");
        const dates = document.createElement("td");
        const actions = document.createElement("td");

        created.innerText = "";
        dates.innerText = "";

        const inputName = document.createElement("input");
        inputName.className = "inputName";
        name.appendChild(inputName);

        const inputContent = document.createElement("input");
        inputContent.className = "inputContent";
        content.appendChild(inputContent);
        inputContent.style.width = "100%";

        const selectCategory = document.createElement("select");
        selectCategory.className = "selectCategory";
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        let opt3 = document.createElement("option");
        opt1.text = "Task";
        opt2.text = "Random Thought";
        opt3.text = "Idea";
        selectCategory.add(opt1, null);
        selectCategory.add(opt2, null);
        selectCategory.add(opt3, null);
        category.appendChild(selectCategory);

        const addButton = document.createElement("button");
        addButton.className = "addNote";
        addButton.appendChild(document.createTextNode("ADD"));

        actions.append(addButton);
        row.append(name, created, category, content, dates, actions);
        this.mainList.appendChild(row);
    }
}

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.showArchive = this.showArchive.bind(this);
        this.showAddRow = this.showAddRow.bind(this);
        this.addNote = this.addNote.bind(this);
        //this.editNote = this.editNote.bind(this);
        //this.archiveNote = this.archiveNote.bind(this);
        //this.deleteNote = this.deleteNote.bind(this);
    }

    addHandle() {
        this.view.addButton.addEventListener("click", this.showAddRow);
        this.view.mainList.addEventListener("click", this.editNote);
        this.view.mainList.addEventListener("click", this.archiveNote);
        this.view.mainList.addEventListener("click", this.deleteNote);
        this.view.archiveList.addEventListener("click", this.editNote);
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

    editTask(e) {
        if (e.target.className !== "editButton") return;
        let newName = prompt("Enter a new name for your task");
        let oldName = e.target.parentElement.childNodes[0].textContent;
        this.model.editTask(oldName, newName);
        this.removeHandle();
        this.renderNotes();
        this.addHandle();
    }

    deleteTask(e) {
        if (e.target.className !== "deleteButton") return;
        let name = e.target.parentElement.childNodes[0].textContent;
        this.model.deleteTask(name);
        this.removeHandle();
        this.renderNotes();
        this.addHandle();
    }
}

class NoteModel {
    constructor() {
        this.notes =
            [
                { name: "Shopping list", created: "20/04/2021", category: "Task", content: "Tomatoes, bread", isArchived: false },
                { name: "The theory of evolution", created: "27/04/2021", category: "Random Thought", content: "The evolution is change in the heritable characteristics of biological populations over successive generations.", isArchived: false },
                { name: "Dentist appoinment", created: "04/05/2021", category: "Task", content: "I’m gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021", isArchived: false },
                { name: "William Haddis", created: "07/05/2021", category: "Idea", content: "Power doesn't corrupt people, people corrupt power.", isArchived: false },
                { name: "Books", created: "15/05/2021", category: "Task", content: "The Lean Startup", isArchived: false },
                { name: "Hello, world", created: "01/09/2021", category: "Idea", content: "Learn JavaScript", isArchived: true },
                { name: "New Year Celebration", created: "20/12/2021", category: "Random Thought", content: "Buy Christmas tree", isArchived: true },
                { name: "New Year Celebration", created: "20/12/2021", category: "Random Thought", content: "Buy Christmas tree", isArchived: true }
            ]
    }

    addNote(name, content, category) {
        let today = new Date();
        let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        let month = today.getMonth() < 9 ? "0" + (today.getMonth()+1) : today.getMonth()+1
        let date = `${day}/${(month)}/${today.getFullYear()}`;
        let newNote = 
        {
            name: name,
            created: date,
            category: category,
            content: content,
            isArchived: false
        }
        this.notes.push(newNote);
    }

    deleteTask(name) {
        let index = this.notes.indexOf(name);
        this.notes.splice(index, 1);
        const jsonTasks = JSON.stringify(this.notes);
        localStorage.setItem("myTasks", jsonTasks);
    }

    editTask(oldName, newName) {
        let index = this.notes.indexOf(oldName);
        this.notes[index] = newName;
        const jsonTasks = JSON.stringify(this.notes);
        localStorage.setItem("myTasks", jsonTasks);
    }

    getFirstData() {
        let array = this.notes.filter(note => note.isArchived === false);
        return array;
    }

    getSecondData() {
        let data = [
            { category: "Task", active: 0, archived: 0 },
            { category: "Random Thought", active: 0, archived: 0 },
            { category: "Idea", active: 0, archived: 0 }
        ];
        this.notes.forEach(note => {
            if (note.category === "Task" && note.isArchived === false) data[0].active += 1;
            if (note.category === "Task" && note.isArchived === true) data[0].archived += 1;
            if (note.category === "Random Thought" && note.isArchived === false) data[1].active += 1;
            if (note.category === "Random Thought" && note.isArchived === true) data[1].archived += 1;
            if (note.category === "Idea" && note.isArchived === false) data[2].active += 1;
            if (note.category === "Idea" && note.isArchived === true) data[2].archived += 1;
        });
        return data;
    }

    getArchiveData(e) {
        let category = e.target.parentElement.firstElementChild.innerText;
        let array = this.notes.filter(note => note.category === category && note.isArchived === true);
        return array;
    }
}