let noteIdCounter = 8;
let columnIdCounter = 4;

// create new empty note
document
  .querySelectorAll(".column")
  // 'button' for create new note is in each column
  .forEach(columnElement => {
    // this is 'button' for create new note
    const spanAction_addNote = columnElement.querySelector(
      "[data-action-addNote]"
    );

    // create new note for column with click
    spanAction_addNote.addEventListener("click", function(evt) {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.setAttribute("draggable", "true");
      noteElement.setAttribute("data-note-id", `${noteIdCounter}`);

      // count id for the new note
      noteIdCounter++;

      // add new note to column
      columnElement.querySelector("[data-notes]").append(noteElement);
    });
  });
