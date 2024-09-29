const participants = [];
const input = document.getElementById("participant");
const addBtn = document.getElementById("addParticipantBtn");
const randomBtn = document.getElementById("selectRandomBtn");
const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

// Function to generate random hex color
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Add participant to the array and show on wheel
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (name !== "") {
    participants.push(name);
    renderWheel();
    input.value = ""; // Clear input after adding
  }
});

// Function to render participants on the wheel
function renderWheel() {
  wheel.innerHTML = ""; // Clear the wheel
  const angle = 360 / participants.length;
  participants.forEach((participant, index) => {
    const slice = document.createElement("div");
    slice.classList.add("slice");
    slice.style.transform = `rotate(${angle * index}deg)`;
    slice.style.backgroundColor = getRandomColor();

    // Add the participant's name inside a span for better rotation control
    const nameSpan = document.createElement("span");
    nameSpan.textContent = participant;
    slice.appendChild(nameSpan);
    wheel.appendChild(slice);
  });
}

// Randomly select a participant by spinning the wheel
randomBtn.addEventListener("click", () => {
  if (participants.length > 0) {
    wheel.classList.add("spin");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      const selectedParticipant = participants[randomIndex];

      // Update the result and style it
      result.textContent = `Selected: ${selectedParticipant}`;
      result.style.backgroundColor = getRandomColor();
      result.classList.add("highlight"); // Add the pulse effect

      wheel.classList.remove("spin"); // Stop spinning
    }, 3000); // The duration of the spin animation
  } else {
    result.textContent = "No Participants added yet!";
  }
});
