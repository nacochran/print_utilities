let isDragging = false;
let startY;
let startHeight;

// Setup pring dialog
function setup_print_dialog(text) {
  let printDialog = document.createElement("div");
  printDialog.classList.add('print-dialog');
  printDialog.innerHTML = `\
    <button class="exit-button">X</button> \
    <div class="drag-handle"></div> \
    <div class="scroll-container"> \
      <ul class="print-body"><li>${text}</li></ul> \
    </div>`;
  document.body.appendChild(printDialog);


  const exitButton = printDialog.querySelector(".exit-button");
  exitButton.addEventListener("click", () => {
    printDialog.remove();
  });

  let dragHandle = document.getElementsByClassName("drag-handle")[0];

  // Start dragging
  dragHandle.addEventListener('mousedown', (event) => {
    isDragging = true;
    startY = event.clientY;
    startHeight = printDialog.offsetHeight;
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
  });

  // Perform dragging
  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaY = startY - event.clientY;
      const newHeight = startHeight + deltaY;

      printDialog.style.height = `${newHeight}px`;
    }
  });

  // Stop dragging
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      // Re-enable text selection
      document.body.style.userSelect = '';
    }
  });
}

function println(text) {
  let dialog = document.getElementsByClassName("print-body");
  if (dialog.length == 0) {
    setup_print_dialog(text);
  } else {
    list = dialog[0];
    let newItem = document.createElement("li");
    newItem.textContent = text;
    list.appendChild(newItem);
  }
}
