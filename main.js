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

document.addEventListener("DOMContentLoaded", () => {
  // Word To Guess
  const wordToGuess =
    wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];

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

  // TODO: Acabar esto
  const arrayToSend = [];

  const send = () => {
    for (const element of Array.from(contActual.children)) {
      arrayToSend.push(element.textContent);
    }
    console.log(arrayToSend);
    console.log("Esto va a saltar una linea");
  };
  const remove = () => {
    console.log("Esto va a borrar una letra");
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
            currentCase.textContent = event.target.textContent;

            currentCase.classList.remove("current");
            if (currentCase.nextElementSibling) {
              currentCase.nextElementSibling.classList.add("current");
            }
            console.log(event.target.textContent);
            break;
        }
      });
    });
  };

  write();
};
