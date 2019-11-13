// create new empty note
document
  .querySelectorAll(".column")
  // 'button' for create new note is in each column
  .forEach(Column.process);

// create new empty column
document
  .querySelector("[data-action-addColumn]")
  // this is 'button' for create new column
  .addEventListener("click", function(event) {
    // create new column with click
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.setAttribute("draggable", "true");
    columnElement.setAttribute("data-column-id", `${Column.idCounter}`);

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
    Column.idCounter++;

    // add new column
    document.querySelector(".columns").append(columnElement);
    Column.process(columnElement);
  });

// editable notes
document.querySelectorAll(".note").forEach(Note.process);
