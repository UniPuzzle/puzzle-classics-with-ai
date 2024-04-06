function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.innerText);
  ev.dataTransfer.dropEffect = "move";
  ev.target.style.cursor = "grabbing";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.classList.contains("drop-zone")) {
    ev.target.setAttribute("data-number", data);
    checkForSubmitButton();
  }
}

function checkForSubmitButton() {
  var dropZones = document.querySelectorAll(".drop-zone");
  var allFilled = true;
  var zeroCount = 0;

  // Check if all drop zones are filled and count the number of zeros
  dropZones.forEach(function (zone) {
    var number = zone.getAttribute("data-number");
    if (!number) {
      allFilled = false;
    } else if (number == "0") {
      zeroCount++;
    }
  });

  // If all drop zones are filled
  if (allFilled) {
    // If there were three zeros
    if (zeroCount == 3) {
      // Clear all drop zones
      dropZones.forEach(function (zone) {
        zone.setAttribute("data-number", "");
      });
      // Hide the Submit button
      document.querySelector(".submit-button").style.display = "none";
      // Show the modal
      document.getElementById("hintModal").style.display = "block";
    } else {
      // Show the Submit button
      document.querySelector(".submit-button").style.display = "block";
    }
  } else {
    // Hide the Submit button
    document.querySelector(".submit-button").style.display = "none";
  }
}

function submitNumbers() {
  // Handle submission logic here
  alert("Numbers submitted!");
}

function closeModal() {
  document.getElementById("hintModal").style.display = "none";
}
