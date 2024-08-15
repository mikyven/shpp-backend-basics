// task 1
const firstBlackSquare = document.getElementById("black-square_first");
const CSSHideButton = document.getElementById("hide_css");
const JSHideButton = document.getElementById("hide_js");
const CSSAndJSHideButton = document.getElementById("hide_css-js");

const checkBlackSquare = () => !!firstBlackSquare;

CSSHideButton.addEventListener("click", () => {
  if (checkBlackSquare) {
    firstBlackSquare.style.display = "none";
  }
});

JSHideButton.addEventListener("click", () => {
  if (checkBlackSquare) {
    firstBlackSquare.remove();
  }
});

CSSAndJSHideButton.addEventListener("click", () => {
  if (checkBlackSquare) {
    firstBlackSquare.classList.add("hidden");
  }
});

// task 2
const firstSwitchButton = document.getElementById("switch-first");

firstSwitchButton.addEventListener("click", () => {
  const isHidden = firstBlackSquare.classList.contains("hidden");

  if (isHidden) {
    firstBlackSquare.classList.remove("hidden");
  } else {
    firstBlackSquare.classList.add("hidden");
  }
});

// task 3
const secondSwitchButton = document.getElementById("switch-second");
const blackSquareGroup = document.querySelectorAll(".black-square");

secondSwitchButton.addEventListener("click", () => {
  const areHidden = Array.from(blackSquareGroup).every((i) =>
    i.classList.contains("hidden")
  );

  if (areHidden) {
    blackSquareGroup.forEach((i) => i.classList.remove("hidden"));
  } else {
    blackSquareGroup.forEach((i) => i.classList.add("hidden"));
  }
});

// task 4
const selectorForm = document.getElementById("selector_form");
const selectorInput = document.getElementById("selector_input");

selectorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = selectorInput.value;
  const selectedNodes = document.querySelectorAll(value);
  if (!selectedNodes.length) {
    if (document.querySelector(".form-warning")) return;
    const warning = document.createElement("p");
    warning.className = "form-warning";
    warning.textContent = "There is no element with such selector";
    selectorForm.appendChild(warning);
    return;
  }
  selectedNodes.forEach((i) => i.remove());
});

selectorInput.addEventListener("input", () =>
  document.querySelector(".form-warning")?.remove()
);

// task 5
const yellowSquare = document.querySelector(".yellow-square");

const alertAndChangeListenerOnClick = () => {
  alert("Привіт");
  yellowSquare.removeEventListener("click", alertAndChangeListenerOnClick);
  yellowSquare.addEventListener("click", removeOnClick);
};
const removeOnClick = () => yellowSquare.remove();

yellowSquare.addEventListener("click", alertAndChangeListenerOnClick);

// task 6
const redSquare = document.querySelector(".red-square");
const hoverButton = document.querySelector(".hover-button");

hoverButton.addEventListener("mouseenter", () =>
  redSquare.classList.remove("hidden")
);
hoverButton.addEventListener("mouseleave", () =>
  redSquare.classList.add("hidden")
);

// task 7
const greenRectangle = document.querySelector(".green-rectangle");
const switchInput = document.querySelector(".switch-input");

switchInput.addEventListener("focus", () =>
  greenRectangle.classList.remove("hidden")
);

switchInput.addEventListener("input", () =>
  greenRectangle.classList.add("hidden")
);

// task 8
const taskDiv = document.querySelector(".task-8");
const imageInput = document.querySelector(".image-input");
const showImageButton = document.querySelector(".show-image-button");

showImageButton.addEventListener("click", () => {
  const image = document.createElement("img");
  image.src = imageInput.value;
  taskDiv.appendChild(image);
});
