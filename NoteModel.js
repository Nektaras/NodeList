export default class NoteModel {
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
                { name: "New Year Celebration1", created: "20/12/2021", category: "Random Thought", content: "Buy Christmas tree", isArchived: true }
            ]
    }

    addNote(name, content, category) {
        let obj = this.notes.find(note => name === note.name);
        if (obj) {
            alert("You already have one with this name. Change it");
            return;
        }
        let today = new Date();
        let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        let month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1
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

    editNote(oldName, newName, content, category) {
        let obj = this.notes.find(note => note.name === newName);
        if (obj) {
            alert("You already have one with this name. Change it");
            return;
        }
        obj = this.notes.find(note => note.name === oldName);
        obj.name = newName;
        obj.content = content;
        obj.category = category;
        let today = new Date();
        let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        let month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1
        let date = `${day}/${(month)}/${today.getFullYear()}`;
        obj.created = date;
    }

    deleteNote(name) {
        let arr = this.notes.filter(note => note.name !== name);
        this.notes = arr;
    }

    archiveNote(name) {
        let obj = this.notes.find(note => note.name === name);
        obj.isArchived = true;
    }

    unarchiveNote(name) {
        let obj = this.notes.find(note => note.name === name);
        obj.isArchived = false;
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
        if (array.length > 0) return array;
    }
}