const Application = {
  save() {
    const object = {
      columns: {
        idCounter: Column.IdCounter,
        items: []
      },
      notes: {
        idCounter: Note.idCounter,
        items: []
      }
    };
    document.querySelectorAll(".column").forEach(columnElement => {
      const column = {
        id: parseInt(columnElement.getAttribute("data-column-id")),
        noteIds: []
      };

      columnElement.querySelectorAll(".note").forEach(noteElement => {
        column.noteIds.push(parseInt(noteElement.getAttribute("data-note-id")));
      });

      object.columns.items.push(column);
      // TODO: добавление в массив без модификации его
    });

    document.querySelectorAll(".note").forEach(noteElement => {
      const note = {
        id: parseInt(noteElement.getAttribute("data-note-id")),
        content: noteElement.textContent.trim()
      };

      object.notes.items.push(note);
    });

    const json = JSON.stringify(object);

    localStorage.setItem("trello", json);
  },

  load() {
    if (!localStorage.getItem("trello")) {
      return;
    }

    const object = JSON.parse(localStorage.getItem("trello"));
  }
};