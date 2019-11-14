const Column = {
  columnIdCounter: 4,
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

    // drop note on column
    columnElement.addEventListener("dragover", Column.dragover);
    columnElement.addEventListener("drop", Column.drop);
  },

  dragover(event) {
    event.preventDefault();
  },

  drop() {
    if (Note.dragged) {
      return this.querySelector("[data-notes]").append(Note.dragged);
    }
  }
};
