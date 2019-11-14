class Column {
  constructor(id = null) {
    const instance = this;

    this.notes = [];

    // create new column
    const element = (this.element = document.createElement("div"));
    element.classList.add("column");
    element.setAttribute("draggable", "true");

    if (id) {
      element.setAttribute("data-column-id", id);
    } else {
      element.setAttribute("data-column-id", "${Column.idCounter}");
      // count id for the new column
      Column.idCounter++;
    }

    element.innerHTML = `
      <p class="column-header">
        В плане
      </p>
      <div data-notes></div>
      <p class="column-footer">
        <span data-action-addNote class="action">
          + Добавить карточку
        </span>
      </p>
    `;
    // function for processing of column
    // this is 'button' for create new note
    const spanAction_addNote = element.querySelector("[data-action-addNote]");

    // create new note for column with click
    spanAction_addNote.addEventListener("click", function(event) {
      const note = new Note();

      // add new note to column
      instance.add(note.element);

      // element.querySelector("[data-notes]").append(note.element);

      note.element.setAttribute("contenteditable", "true");
      // add focus to new note
      note.element.focus();
    });

    const headerElement = element.querySelector(".column-header");

    headerElement.addEventListener("dblclick", function(event) {
      headerElement.setAttribute("contenteditable", "true");
      headerElement.focus();
    });

    headerElement.addEventListener("blur", function(event) {
      headerElement.removeAttribute("contenteditable", "true");
    });

    // event for drag column
    element.addEventListener("dragstart", this.dragstart.bind(this));
    element.addEventListener("dragend", this.dragend.bind(this));
    element.addEventListener("dragover", this.dragover.bind(this));
    element.addEventListener("drop", this.drop.bind(this));
  }

  get notes() {
    return Array.from(this.querySelectorAll(".note"));
  }

  add(...notes) {
    for (const note of notes) {
      if (!this.notes.includes(note)) {
        this.notes.push(note);

        this.element.querySelector("[data-notes]").append(note.element);
      }
    }
  }

  dragstart(event) {
    Column.dragged = this.element;
    Column.dragged.classList.add("dragged");

    event.stopPropagation();

    document
      .querySelectorAll(".note")
      .forEach(noteElement => noteElement.removeAttribute("draggeble"));
  }

  dragend(event) {
    Column.dragged.classList.remove("dragged");
    Column.dragged = null;
    Column.dropped = null;

    document
      .querySelectorAll(".note")
      .forEach(noteElement => noteElement.setAttribute("draggeble", "true"));

    document
      .querySelectorAll(".column")
      .forEach(columnElement => columnElement.classList.remove("under"));

    Application.save();
  }

  dragover(event) {
    event.preventDefault();
    event.stopPropagation();

    if (Column.dragged === this.element) {
      Column.dropped = null;
      if (Column.dropped) {
        Column.dropped.classList.remove("under");
      }
    }

    if (!Column.dragged || Column.dragged === this.element) {
      return;
    }

    Column.dropped = this.element;

    document
      .querySelectorAll(".column")
      .forEach(element => element.classList.remove("under"));

    this.element.classList.add("under");
  }

  drop() {
    if (Note.dragged) {
      return this.element.querySelector("[data-notes]").append(Note.dragged);
    } else if (Column.dragged) {
      const children = Array.from(document.querySelector(".columns").children);
      const indexA = children.indexOf(this.element);
      const indexB = children.indexOf(Column.dragged);

      if (indexA < indexB) {
        document
          .querySelector(".columns")
          .insertBefore(Column.dragged, this.element);
      } else {
        document
          .querySelector(".columns")
          .insertBefore(Column.dragged, this.element.nextElementSibling);
      }

      document
        .querySelectorAll(".column")
        .forEach(this.element.classList.remove("under"));
    }
  }
}

Column.idCounter = 4;
Column.dragged = null;
Column.dropped = null;
