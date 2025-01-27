/**
 * Checks if the current device is a mobile device.
 *
 * This function tests the user agent string to determine if the device is a mobile device.
 *
 * @returns {boolean} True if the device is a mobile device, false otherwise.
 */
const isMobileDevice = () =>
  /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

/**
 * Animates typing text letter by letter in a specified HTML element.
 *
 * @param {string[]} words - An array of words to be typed.
 * @param {string} id - The ID of the HTML element where the text will be displayed.
 * @param {string[]} [colors=['#000']] - An array of colors for the text. Defaults to black.
 * @param {boolean} [loop=false] - Whether the text should loop after finishing.
 * @param {Function} [onComplete=null] - A callback function to be called when the animation completes.
 * @param {boolean} [showCursor=true] - Whether to display the blinking cursor or not.
 * @param {number} [typingSpeed=120] - The speed (in milliseconds) for typing each character.
 * @param {number} [delay=1000] - The delay (in milliseconds) between words.
 */

const consoleText = (
  words,
  id,
  colors = ["#000"],
  loop = false,
  onComplete = null,
  showCursor = true,
  typingSpeed = 120,
  delay = 1000 // Novo parâmetro: Tempo de pausa entre palavras (em ms)
) => {
  let letterCount = 0;
  let waiting = false;
  let wordIndex = 0; // Índice da palavra atual
  const target = document.getElementById(id);
  const console = document.getElementById("console"); // Cursor (_)
  let visible = true;
  let cursorInterval;

  // Ajusta as cores para garantir que correspondam ao número de palavras
  if (colors.length < words.length) {
    console.warn(
      "The color array has fewer items than the word array. Repeating colors..."
    );
    colors = [
      ...colors,
      ...Array(words.length - colors.length).fill(colors[colors.length - 1]),
    ];
  }

  // Define a cor inicial do texto
  target.style.color = colors[wordIndex];

  // Animação de digitação
  const typingInterval = setInterval(() => {
    if (waiting) return;

    // Digita a palavra atual
    if (letterCount < words[wordIndex].length) {
      target.innerHTML = words[wordIndex].substring(0, letterCount + 1);
      letterCount++;
    } else {
      // Pausa antes de passar para a próxima palavra
      waiting = true;
      setTimeout(() => {
        letterCount = 0;
        wordIndex = (wordIndex + 1) % words.length; // Avança para a próxima palavra
        target.style.color = colors[wordIndex]; // Atualiza a cor do texto
        waiting = false;

        // Verifica se o loop está desativado e finaliza após exibir todas as palavras
        if (!loop && wordIndex === 0) {
          clearInterval(typingInterval);
          if (showCursor && cursorInterval) clearInterval(cursorInterval);
          if (onComplete) onComplete(); // Chama o callback ao final da animação
        }
      }, delay); // Usa o parâmetro delay
    }
  }, typingSpeed);

  // Animação do cursor
  if (showCursor && console) {
    cursorInterval = setInterval(() => {
      console.className = visible
        ? "introduction__underscore body hidden"
        : "introduction__underscore body";
      visible = !visible;
    }, 400);
  } else if (console) {
    // Remove o cursor se showCursor for false
    console.remove();
  }
};

/**
 * Initializes the document once the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const overlay = document.querySelector(".introduction");
  const centeredText = document.querySelector(".introduction__text");
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".backround-image");

  // Cria o elemento <video>
  const heroVideo = document.createElement("video");
  heroVideo.classList.add("background-video");
  heroVideo.ariaHidden = true;
  heroVideo.autoplay = true;
  heroVideo.muted = true;
  heroVideo.loop = true;
  heroVideo.playsInline = true;

  if (isMobileDevice()) {
    heroImage.style.backgroundImage = "url('./assets/background-mobile.png')";
    heroVideo.src = "./assets/background-mobile.mp4";
  } else {
    heroImage.style.backgroundImage = "url('./assets/background-desktop.png')";
    heroVideo.src = "./assets/background-desktop.mp4";
  }

  heroVideo.addEventListener("canplaythrough", () => {
    hero.appendChild(heroVideo); // Adiciona o vídeo ao Hero
    heroImage.style.opacity = "0";
  });

  heroVideo.addEventListener("error", () => {
    console.error("Error loading background video.");
  });

  consoleText(
    ["Every great thing starts with a blank page"], // Texto
    "text", // ID do elemento onde o texto será exibido
    ["var(--text-color-1)"], // Cores do texto
    false, // Sem loop
    () => {
      // Ações ao final da animação
      setTimeout(() => {
        centeredText.style.opacity = "0"; // Inicia o fade-out do texto
      }, 1600); // Metade do tempo do fade-out do overlay

      setTimeout(() => {
        overlay.style.opacity = "0"; // Inicia o fade-out do overlay
        overlay.addEventListener("transitionend", () => {
          content.ariaHidden = false; // Exibe o conteúdo
          overlay.remove(); // Remove o elemento após a transição
        });
      }, 3200); // Tempo total antes do fade-out do overlay
    },
    false,
    150
  );

  // FUNÇÃO COM ANIMAÇÃO E CORES E EM LOOP
  // consoleText(
  //   ["EAT donuts", "LOVE hapiness", "WORK less", "PLAY more", "SLEEP well"], // Palavras para animar
  //   "text", // ID do elemento onde o texto será exibido
  //   ["#000000", "#FA8072", "#AEC6CF", "#98FF98", "#000000"], // Cores: Branco, salmão, azul pastel, verde menta e branco
  //   true, // Ativar loop
  //   null, // Sem callback
  //   false, // Mostrar cursor
  //   160 // Velocidade da digitação (ms)
  // );
});
