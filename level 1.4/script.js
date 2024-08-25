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
const taskEightDiv = document.querySelector(".task-8");
const imageInput = document.querySelector(".image-input");
const showImageButton = document.querySelector(".show-image-button");

showImageButton.addEventListener("click", () => {
  const url = imageInput.value;
  if (!url) return;
  const image = document.createElement("img");
  image.src = url;
  taskEightDiv.appendChild(image);
});

// task 9
const taskNineDiv = document.querySelector(".task-9");
const imageTextarea = document.querySelector(".image-textarea");
const showImagesButton = document.querySelector(".show-images-button");

showImagesButton.addEventListener("click", () => {
  const urls = imageTextarea.value.split("\n");
  if (!urls.length) return;
  urls.forEach((i) => {
    const image = document.createElement("img");
    image.src = i;
    taskNineDiv.appendChild(image);
  });
});

// task 10
const coordinates = document.querySelectorAll("#coordinate");
const updateCoordinates = (e) => {
  coordinates.forEach((i) => {
    i.textContent = `${i.className}: ${e[`client${i.className}`]}`;
  });
};

document.addEventListener("mousemove", updateCoordinates);

// task 11
const languageDiv = document.querySelector(".selected-language");
const displayLanguage = () => {
  languageDiv.textContent = `Language: ${navigator.language}`;
};

// task 12
const latitudeDiv = document.getElementById("latitude");
const longitudeDiv = document.getElementById("longitude");
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      latitudeDiv.textContent = lat;
      longitudeDiv.textContent = long;
    });
  } else {
    latitudeDiv.parentElement.textContent =
      "Geolocation is not supported in your browser.";
  }
};

// task 13
const localInput = document.querySelector(".local-input");
const cookieInput = document.querySelector(".cookie-input");
const sessionInput = document.querySelector(".session-input");

localInput.addEventListener("input", (e) =>
  localStorage.setItem("localInputValue", e.target.value)
);

cookieInput.addEventListener("input", (e) => {
  document.cookie = `cookieInputValue=${e.target.value}`;
});

sessionInput.addEventListener("input", (e) => {
  sessionStorage.setItem("sessionInputValue", e.target.value);
});

window.addEventListener("load", (e) => {
  displayLanguage();
  getLocation();

  localInput.value = localStorage.getItem("localInputValue") || "";
  cookieInput.value = document.cookie.split("=")[1] || "";
  sessionInput.value = sessionStorage.getItem("sessionInputValue") || "";
});

// task 14
const scrollButton = document.querySelector(".scroll-button");

scrollButton.addEventListener("click", () =>
  window.scroll({ top: 0, behavior: "smooth" })
);

document.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const isAtTheBottom =
    doc.clientHeight + window.scrollY >= (doc.scrollHeight || doc.clientHeight);
  if (isAtTheBottom) {
    scrollButton.classList.remove("hidden");
  } else if (!isAtTheBottom && !scrollButton.classList.contains("hidden")) {
    scrollButton.classList.add("hidden");
  }
});

// task 15
const innerBlock = document.querySelector(".inner-block");
const outerBlock = document.querySelector(".outer-block");

innerBlock.addEventListener("click", (e) => {
  e.stopPropagation();
  alert("Hello from inner block");
});

outerBlock.addEventListener("click", () => {
  alert("Hello from outer block");
});

// task 16
const showBlockButton = document.querySelector(".show-block-button");
const blockingBackground = document.querySelector(".blocking-background");

showBlockButton.addEventListener("click", () => {
  blockingBackground.classList.remove("hidden");
});

blockingBackground.addEventListener("click", () => {
  blockingBackground.classList.add("hidden");
});

// task 17
const unreloadingForm = document.querySelector(".task-17 form");

unreloadingForm.addEventListener("submit", (e) => e.preventDefault());

// task 18
const fileLabel = document.querySelector(".file-label");
const fileInput = document.querySelector(".file-input");
const result = document.querySelector(".result");

fileLabel.addEventListener("dragenter", (e) => {
  e.preventDefault();
  fileLabel.classList.add("hovered");
});

fileLabel.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (e.target === fileLabel && !fileLabel.contains(e.relatedTarget)) {
    fileLabel.classList.remove("hovered");
  }
});

fileLabel.addEventListener("dragover", (e) => e.preventDefault());

function getTotalFilesSizes(items) {
  let total = 0;
  if (items) {
    [...items].forEach((item) => {
      if (item.kind === "file") {
        total += +(item.getAsFile().size / 1024 ** 2).toFixed(2);
      } else {
        total += +(item.size / 1024 ** 2).toFixed(2);
      }
    });
  }
  return total;
}

fileLabel.addEventListener("drop", (e) => {
  e.preventDefault();
  result.textContent = `Total size of all files is ${getTotalFilesSizes(
    e.dataTransfer.items
  )}MB.`;
});

fileInput.addEventListener("change", (e) => {
  e.preventDefault();
  result.textContent = `Total size of all files is ${getTotalFilesSizes(
    e.target.files
  )}MB.`;
});
