let columnIdCounter = 4;

// create new empty note
document
  .querySelectorAll(".column")
  // 'button' for create new note is in each column
  .forEach(columnProcess);

// create new empty column
document
  .querySelector("[data-action-addColumn]")
  // this is 'button' for create new column
  .addEventListener("click", function(event) {
    // create new column with click
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");
    columnElement.setAttribute("data-column-id", `${columnIdCounter}`);

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
    // count id for the new column
    columnIdCounter++;

    // add new column
    document.querySelector(".columns").append(columnElement);
    columnProcess(columnElement);
  });

// editable notes
document.querySelectorAll(".note").forEach(Note.process);

// function for processing of column
function columnProcess(columnElement) {
  // this is 'button' for create new note
  const spanAction_addNote = columnElement.querySelector(
    "[data-action-addNote]"
  );

  // create new note for column with click
  spanAction_addNote.addEventListener("click", function(event) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("draggable", "true");
    noteElement.setAttribute("data-note-id", `${Note.idCounter}`);

    // count id for the new note
    Note.idCounter++;

    // add new note to column
    columnElement.querySelector("[data-notes]").append(noteElement);
    Note.process(noteElement);

    noteElement.setAttribute("contenteditable", "true");
    noteElement.focus();
  });

  const headerElement = columnElement.querySelector(".column-header");
  headerElement.addEventListener("dblclick", function(event) {
    headerElement.setAttribute("contenteditable", "true");
    headerElement.focus();
  });

  headerElement.addEventListener("blur", function(event) {
    headerElement.removeAttribute("contenteditable");
  });

  // drop note on column
  columnElement.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  columnElement.addEventListener("drop", function(event) {
    if (Note.dragged) {
      return columnElement.querySelector("[data-notes]").append(Note.dragged);
    }
  });
}
