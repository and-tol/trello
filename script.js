let noteIdCounter = 8;
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
  .addEventListener("click", function(evt) {
    // create new column with click
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");
    columnElement.setAttribute("data-column-id", `${columnIdCounter}`);

    columnElement.innerHTML = `
    <p class="column-header" contenteditable="true">
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

function columnProcess(columnElement) {
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
}
