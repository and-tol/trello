const Column = {
  idCounter: 4,
  dragged: null,
  dropped: null,

  // function for processing of column
  process(columnElement) {
    // this is 'button' for create new note
    const spanAction_addNote = columnElement.querySelector(
      "[data-action-addNote]"
    );

    // create new note for column with click
    spanAction_addNote.addEventListener("click", function() {
      const noteElement = Note.create();

      // add new note to column
      columnElement.querySelector("[data-notes]").append(noteElement);

      noteElement.setAttribute("contenteditable", "true");
      // add focus to new note
      noteElement.focus();
    });

    const headerElement = columnElement.querySelector(".column-header");

    headerElement.addEventListener("dblclick", function(event) {
      headerElement.setAttribute("contenteditable", "true");
      headerElement.focus();
    });

    headerElement.addEventListener("blur", function(event) {
      headerElement.removeAttribute("contenteditable", "true");
    });

    // event for drag column
    columnElement.addEventListener("dragstart", Column.dragstart);
    columnElement.addEventListener("dragend", Column.dragend);

    // columnElement.addEventListener("dragenter", Column.dragenter);
    columnElement.addEventListener("dragover", Column.dragover);
    // columnElement.addEventListener("dragleave", Column.dragleave);

    // drop note on column
    columnElement.addEventListener("drop", Column.drop);
  },

  // create new column
  create(id = null) {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");

    if (id) {
      columnElement.setAttribute("data-column-id", id);
    } else {
      columnElement.setAttribute("data-column-id", Column.idCounter);
      // count id for the new column
      Column.idCounter++;
    }

    columnElement.innerHTML = `
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

    Column.process(columnElement);

    return columnElement;
  },

  dragstart(event) {
    Column.dragged = this;
    Column.dragged.classList.add("dragged");

    event.stopPropagation();

    document
      .querySelectorAll(".note")
      .forEach(noteElement => noteElement.removeAttribute("draggeble"));
  },

  dragend(event) {
    Column.dragged.classList.remove("dragged");
    Column.dragged = null;
    Column.dropped = null;

    document
      .querySelectorAll(".note")
      .forEach(noteElement => noteElement.setAttribute("draggeble", "true"));

    Application.save();
  },

  dragover(event) {
    event.preventDefault();
    event.stopPropagation();

    if (Column.dragged === this) {
      Column.dropped = null;
      if (Column.dropped) {
        Column.dropped.classList.remove("under");
      }
    }

    if (!Column.dragged || Column.dragged === this) {
      return;
    }

    Column.dropped = this;

    document
      .querySelectorAll(".column")
      .forEach(columnElement => columnElement.classList.remove("under"));

    this.classList.add("under");
  },

  drop() {
    if (Note.dragged) {
      return this.querySelector("[data-notes]").append(Note.dragged);
    } else if (Column.dragged) {
      const children = Array.from(document.querySelector(".columns").children);
      const indexA = children.indexOf(this);
      const indexB = children.indexOf(Column.dragged);

      if (indexA < indexB) {
        document.querySelector(".columns").insertBefore(Column.dragged, this);
      } else {
        document
          .querySelector(".columns")
          .insertBefore(Column.dragged, this.nextElementSibling);
      }

      document
        .querySelectorAll(".column")
        .forEach(columnElement => columnElement.classList.remove("under"));
    }
  }
};
