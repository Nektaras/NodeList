export default class NoteView {
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

    showEditRow(table, oldContent) {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const created = document.createElement("td");
        const category = document.createElement("td");
        const content = document.createElement("td");
        const dates = document.createElement("td");
        const actions = document.createElement("td");

        created.innerText = oldContent[1].innerText;
        dates.innerText = oldContent[4].innerText;

        const inputName = document.createElement("input");
        inputName.className = "editName";
        inputName.value = oldContent[0].innerText;
        name.appendChild(inputName);

        const inputContent = document.createElement("input");
        inputContent.className = "editContent";
        inputContent.value = oldContent[3].innerText;
        content.appendChild(inputContent);
        inputContent.style.width = "100%";

        const selectCategory = document.createElement("select");
        selectCategory.className = "editCategory";
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        let opt3 = document.createElement("option");
        opt1.text = "Task";
        opt2.text = "Random Thought";
        opt3.text = "Idea";
        if (oldContent[2].innerText === "Task") opt1.selected = true;
        else if (oldContent[2].innerText === "Random Thought") opt2.selected = true;
        else opt3.selected = true;
        selectCategory.add(opt1, null);
        selectCategory.add(opt2, null);
        selectCategory.add(opt3, null);
        category.appendChild(selectCategory);

        const editButton = document.createElement("button");
        editButton.className = "editNote";
        editButton.appendChild(document.createTextNode("EDIT"));

        actions.append(editButton);
        row.append(name, created, category, content, dates, actions);
        table.appendChild(row);
    }
}