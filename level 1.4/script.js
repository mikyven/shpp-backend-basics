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
