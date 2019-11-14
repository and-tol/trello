// // create new empty note
// document
//   .querySelectorAll(".column")
//   // 'button' for create new note is in each column
//   .forEach(Column.process);

// // editable notes
// document.querySelectorAll(".note").forEach(Note.process);

Application.load();

// create new empty column
document
  .querySelector("[data-action-addColumn]")
  // this is 'button' for create new column
  .addEventListener("click", function(event) {
    // create new column with click
    const columnElement = Column.create();
    // add new column
    document.querySelector(".columns").append(columnElement);
    // Column.process(columnElement);

    // save state in local starage
    Application.save();
  });
