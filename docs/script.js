const colors = {
  english: ["red", "blue", "black", "white", "green", "orange", "cyan", "yellow", "pink"],
  russian: ["красный", "синий", "черный", "белый", "зеленый", "оранжевый", "голубой", "желтый", "розовый"],
  spanish: ["rojo", "azul", "negro", "blanco", "verde", "naranja", "cian", "amarillo", "rosa"],
  italian: ["rosso", "blu", "nero", "bianco", "verde", "arancione", "ciano", "giallo", "rosa"],
  polish: ["czerwony", "niebieski", "czarny", "biały", "zielony", "pomarańczowy", "cyjan", "żółty", "różowy"],
  turkish: ["kırmızı", "mavi", "siyah", "beyaz", "yeşil", "turuncu", "camgöbeği", "sarı", "pembe"],
  indonesian: ["merah", "biru", "hitam", "putih", "hijau", "oranye", "sian", "kuning", "merah muda"],
  portuguese: ["vermelho", "azul", "preto", "branco", "verde", "laranja", "ciano", "amarelo", "rosa"]
};

let selectedColors = colors.english; // default to English
let correctCount = 0;
let wrongCount = 0;
let currentIndex = -1;

function setLanguage(language) {
  if (colors[language]) {
    selectedColors = colors[language];
    resetGame();
  } else {
    console.error(`Language "${language}" not found in colors`);
  }
}

const showWord = () => {
  currentIndex++;
  if (currentIndex >= selectedColors.length) {
    showModal();
    return;
  }
  updateWordAndColor();
  document.getElementById("remainingCount").textContent = selectedColors.length - currentIndex;
};

const updateWordAndColor = () => {
  document.getElementById("word").textContent = selectedColors[currentIndex];
  document.getElementById("colorSquare").style.backgroundColor = getColorByIndex(currentIndex);
};

const getColorByIndex = (index) => {
  const colorMap = ["red", "blue", "black", "white", "green", "orange", "cyan", "yellow", "pink"];
  return colorMap[index % colorMap.length];
};

const checkInput = (event) => {
  const userInput = document.getElementById("userInput").value.trim().toLowerCase();
  const currentWord = selectedColors[currentIndex].toLowerCase();

  if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") {
    return;
  }

  if (event.code === "Backspace" || event.code === "Delete") {
    return;
  }

  if (userInput === currentWord) {
    correctCount++;
    document.getElementById("correctCount").textContent = correctCount;
    showWord();
    document.getElementById("userInput").value = "";
  } else if (currentWord.startsWith(userInput)) {
    return;
  } else {
    wrongCount++;
    document.getElementById("wrongCount").textContent = wrongCount;
  }
};

const showModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
  document.getElementById("resultModal").style.display = "block";
  document.getElementById("modalCorrectCount").textContent = correctCount;
  document.getElementById("modalWrongCount").textContent = wrongCount;
};

const resetGame = () => {
  correctCount = 0;
  wrongCount = 0;
  currentIndex = -1;
  document.getElementById("correctCount").textContent = correctCount;
  document.getElementById("wrongCount").textContent = wrongCount;
  document.getElementById("userInput").value = "";
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("remainingCount").textContent = selectedColors.length;
  showWord(); // Display the first word and color
};

window.onload = () => {
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("userInput").addEventListener("input", checkInput);
  document.getElementById("restartButton").addEventListener("click", resetGame);

  const languageButtons = document.querySelectorAll(".language-button");
  languageButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      setLanguage(event.target.getAttribute("data-lang"));
    });
  });

  showWord();
};
