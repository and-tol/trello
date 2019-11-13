let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedNote = null;

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
document.querySelectorAll(".note").forEach(noteProcess);

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
    noteElement.setAttribute("data-note-id", `${noteIdCounter}`);

    // count id for the new note
    noteIdCounter++;

    // add new note to column
    columnElement.querySelector("[data-notes]").append(noteElement);
    noteProcess(noteElement);

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
    if (draggedNote) {
      return columnElement.querySelector("[data-notes]").append(draggedNote);
    }
  });
}

// function for processing of note
function noteProcess(noteElement) {
  // action for edit note
  noteElement.addEventListener("dblclick", function(event) {
    noteElement.setAttribute("contenteditable", "true");
    noteElement.removeAttribute("draggable");
    noteElement.closest(".column").removeAttribute("draggable");
    // focus for edit note
    noteElement.focus();
  });

  noteElement.addEventListener("blur", function(event) {
    noteElement.removeAttribute("contenteditable");
    noteElement.setAttribute("draggable", "true");
    noteElement.closest(".column").setAttribute("draggable", "true");

    if (!noteElement.textContent.trim().length) {
      noteElement.remove();
    }
  });

  noteElement.addEventListener("dragstart", dragstart_noteHandler);
  noteElement.addEventListener("dragend", dragend_noteHandler);
  noteElement.addEventListener("dragenter", dragenter_noteHandler);
  noteElement.addEventListener("dragover", dragover_noteHandler);
  noteElement.addEventListener("dragleave", dragleave_noteHandler);
  noteElement.addEventListener("drop", drop_noteHandler);
}

function dragstart_noteHandler(event) {
  draggedNote = this;
  this.classList.add("dragged");
  event.stopPropagation();
}

function dragend_noteHandler(event) {
  draggedNote = null;
  this.classList.remove("dragged");

  document.querySelectorAll(".note").forEach(x => x.classList.remove("under"));
}

function dragenter_noteHandler(event) {
  if (this === draggedNote) {
    return;
  }
  this.classList.add("under");
}

function dragover_noteHandler(event) {
  event.preventDefault();

  if (this === draggedNote) {
    return;
  }
}

function dragleave_noteHandler(event) {
  if (this === draggedNote) {
    return;
  }
  this.classList.remove("under");
}

function drop_noteHandler(event) {
  event.stopPropagation();

  if (this === draggedNote) {
    return;
  }
  if (this.parentElement === draggedNote.parentElement) {
    const note = Array.from(this.parentElement.querySelectorAll(".note"));
    const indexA = note.indexOf(this);
    const indexB = note.indexOf(draggedNote);
    if (indexA < indexB) {
      this.parentElement.insertBefore(draggedNote.this);
    } else {
      this.parentElement.insertBefore(draggedNote.this.nextElementSibling);
    }
  } else {
    this.parentElement.insertBefore(draggedNote.this);
  }
}
