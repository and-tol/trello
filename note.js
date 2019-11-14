const Note = {
  idCounter: 8,
  dragged: null,
  // function for processing of note
  process(noteElement) {
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

    noteElement.addEventListener("dragstart", Note.dragstart);
    noteElement.addEventListener("dragend", Note.dragend);
    noteElement.addEventListener("dragenter", Note.dragenter);
    noteElement.addEventListener("dragover", Note.dragover);
    noteElement.addEventListener("dragleave", Note.dragleave);
    noteElement.addEventListener("drop", Note.drop);
  },

  // create new note
  create() {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("draggable", "true");
    noteElement.setAttribute("data-note-id", `${Note.idCounter}`);

    // count id for the new note
    Note.idCounter++;

    Note.process(noteElement);

    return noteElement;
  },
  // function for drag
  dragstart(event) {
    Note.dragged = this;
    this.classList.add("dragged");

    event.stopPropagation();
  },

  dragend(event) {
    Note.dragged = null;
    this.classList.remove("dragged");

    document
      .querySelectorAll(".note")
      .forEach(x => x.classList.remove("under"));
  },

  dragenter(event) {
    if (this === Note.dragged) {
      return;
    }
    this.classList.add("under");
  },

  dragover(event) {
    event.preventDefault();

    if (this === Note.dragged) {
      return;
    }
  },

  dragleave(event) {
    if (this === Note.dragged) {
      return;
    }
    this.classList.remove("under");
  },

  drop(event) {
    event.stopPropagation();

    if (this === Note.dragged) {
      return;
    }

    if (this.parentElement === Note.dragged.parentElement) {
      const note = Array.from(this.parentElement.querySelectorAll(".note"));
      const indexA = note.indexOf(this);
      const indexB = note.indexOf(Note.dragged);
      if (indexA < indexB) {
        this.parentElement.insertBefore(Note.dragged, this);
      } else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
      }
    } else {
      this.parentElement.insertBefore(Note.dragged, this);
    }
  }
};
