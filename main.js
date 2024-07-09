// Esqueleto

const wordsToGuess = [
  "perro",
  "arroz",
  "fruta",
  "mango",
  "piano",
  "dulce",
  "pluma",
  "fresa",
  "blusa",
  "gatos",
  "perro",
  "niños",
  "avión",
  "flaco",
  "traje",
  "carta",
  "dolar",
  "rubio",
  "pasto",
  "huevo",
  "brote",
  "bosco",
  "verde",
  "flama",
  "honda",
  "roble",
  "amigo",
  "salsa",
  "tigre",
  "lugar",
  "paseo",
  "campo",
  "guapo",
  "cañón",
  "golpe",
  "llama",
  "pizza",
  "ronda",
  "leche",
  "reyes",
  "nieve",
  "nubes",
  "queso",
  "selva",
  "bebés",
  "grano",
  "papas",
  "marea",
  "puños",
  "cueva",
];

const letterKeys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Ñ",
  "Enviar",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "Borrar",
];

const wordToGuess =
  wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];

console.log(wordToGuess);

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  const title = document.createElement("h1");
  title.innerHTML = "Wordle 2.0";
  document.body.appendChild(title);

  const wordle = document.createElement("div");
  wordle.classList = "wordle";
  document.body.appendChild(wordle);

  for (let attempts = 0; attempts < 5; attempts++) {
    const attempt = document.createElement("div");

    for (let i = 0; i < wordToGuess.length; i++) {
      const letter = document.createElement("div");
      letter.classList = "letter";
      letter.textContent = "_"; // quitar
      attempt.appendChild(letter);
    }
    attempt.classList = "container";

    wordle.appendChild(attempt);
  }

  // Keyboard

  const keyboard = document.createElement("div");
  keyboard.classList = "keyboard";

  letterKeys.forEach((key) => {
    const keyElement = document.createElement("div");
    keyElement.textContent = key;

    switch (key) {
      case "Enviar":
        keyElement.classList = "letterKey enviar";
        break;
      case "Borrar":
        keyElement.classList = "letterKey borrar";
        break;
      default:
        keyElement.classList = "letterKey";
        break;
    }

    keyboard.appendChild(keyElement);
  });

  document.body.appendChild(keyboard);
  wordleBack();
});

const wordleBack = () => {
  document.querySelector(".container").classList.add("actual");
  const contActual = document.querySelector(".actual");

  for (const element of Array.from(contActual.children)) {
    if (element.textContent == "_") {
      element.classList.add("current");
      break;
    }
  }

  const send = () => {
    const arrayToSend = [];
    const contActual = document.querySelector(".actual");
    const word = wordToGuess.toUpperCase().split("");

    contActual.lastElementChild.classList.remove("current");

    for (const element of Array.from(contActual.children)) {
      arrayToSend.push(element.textContent);
    }

    if (arrayToSend.includes("_")) {
      // Comprueba que no se mande vacío
      return;
    }

    console.log(arrayToSend);
    console.log(word);

    for (let i = 0; i < word.length; i++) {
      const children = Array.from(contActual.children);

      if (children[i].textContent === word[i]) {
        children[i].id = "correct";
      }
    }

    // Second pass to mark 'exists' and 'incorrect'
    for (const element of Array.from(contActual.children)) {
      if (element.id !== "correct") {
        if (word.includes(element.textContent)) {
          element.id = "exists";
        } else {
          element.id = "incorrect";
        }
      }
    }

    if (arrayToSend.every((val, index) => val === word[index])) {
      const res = document.createElement("h3");
      res.textContent = "¡has ganado!";
      res.id = "correct";
      document.querySelector(".wordle").appendChild(res);
      return;
    }

    if (contActual) {
      contActual.classList.remove("actual");
      if (contActual.nextElementSibling) {
        contActual.nextElementSibling.classList.add("actual");
        contActual.nextElementSibling.children[0].classList.add("current");
      } else {
        const res = document.createElement("h3");
        res.textContent = `has perdido...\n La palabra era: ${wordToGuess}`;
        res.id = "incorrect";
        document.querySelector(".wordle").appendChild(res);
        return;
      }
    }
  };

  const remove = () => {
    const current = document.querySelector(".current");
    current.textContent = "_";

    if (current.previousElementSibling) {
      current.classList.remove("current");
      current.previousElementSibling.classList.add("current");
    }
  };

  const write = () => {
    document.querySelectorAll(".letterKey").forEach((element) => {
      element.addEventListener("click", (event) => {
        switch (event.target.textContent) {
          case "Enviar":
            send();
            break;

          case "Borrar":
            remove();
            break;

          default: // Escribe las letras
            const currentCase = document.querySelector(".current");
            if (currentCase) {
              currentCase.textContent = event.target.textContent;
              currentCase.classList.remove("current");
              if (currentCase.nextElementSibling) {
                currentCase.nextElementSibling.classList.add("current");
              } else {
                currentCase.classList.add("current");
              }
            }
            break;
        }
      });
    });
  };

  write();
};
