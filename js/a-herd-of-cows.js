const slider = document.getElementById("slider");
const sliderThumb = document.getElementById("sliderThumb");
const notchesContainer = document.querySelector(".notches");
const notchLabelsContainer = document.querySelector(".notch-labels");
const submitButton = document.getElementById("submitButton");

const startValue = 280;
const endValue = 330;
const step = 5;
const totalNotches = (endValue - startValue) / step;
const notchWidth = slider.offsetWidth / totalNotches;

// Create notches and labels
for (let i = 0; i <= totalNotches; i++) {
  const notch = document.createElement("div");
  notch.classList.add("notch");
  notch.style.left = i * notchWidth + "px";
  notchesContainer.appendChild(notch);

  const label = document.createElement("div");
  label.classList.add("notch-label");
  label.style.left = i * notchWidth + "px";
  label.textContent = startValue + i * step;
  notchLabelsContainer.appendChild(label);
}

// Function to snap slider to nearest notch
function snapToNearestNotch() {
  const sliderPos =
    sliderThumb.getBoundingClientRect().left -
    slider.getBoundingClientRect().left;
  const nearestNotch = Math.round(sliderPos / notchWidth);
  const nearestNotchPos = nearestNotch * notchWidth;
  sliderThumb.style.left = nearestNotchPos + "px";

  // Show submit button
  submitButton.style.display = "inline-block";

  // Remove selected label class from other labels
  const allNotchLabels = document.querySelectorAll(".notch-label");
  allNotchLabels.forEach((label) => {
    label.classList.remove("selected-label");
  });

  // Highlight selected label
  const selectedNotchLabel = document.querySelector(
    ".notch-label:nth-child(" + (nearestNotch + 1) + ")"
  );
  selectedNotchLabel.classList.add("selected-label");

  // Center submit button
  submitButton.style.left = "50%";
}

function handleDrag(e) {
  let posX = e.clientX - slider.getBoundingClientRect().left;

  if (posX < 0) {
    posX = 0;
  } else if (posX > slider.offsetWidth - sliderThumb.offsetWidth) {
    posX = slider.offsetWidth - sliderThumb.offsetWidth;
  }

  sliderThumb.style.left = posX + "px";
}

sliderThumb.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", handleDrag);
});

document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", handleDrag);
  snapToNearestNotch();
});
