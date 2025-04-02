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
 * @param {number} [delay=0] - The delay (in milliseconds) between words.
 */

const consoleText = (
  words,
  id,
  colors = ["#000"],
  loop = false,
  onComplete = null,
  showCursor = true,
  typingSpeed = 120,
  delay = 0 // Novo parâmetro: Tempo de pausa entre palavras (em ms)
) => {
  let letterCount = 0;
  let waiting = false;
  let wordIndex = 0; // Índice da palavra atual
  const target = document.getElementById(id);
  const consoleElement = document.getElementById("console"); // Cursor (_)
  let visible = true;
  let cursorInterval;

  // Verifica se os elementos existem antes de continuar
  if (!target) {
    consoleElement.error(`Element with ID "${id}" not found.`);
    return;
  }

  if (showCursor && !consoleElement) {
    consoleElement.warn("Cursor element not found. Skipping cursor animation.");
  }

  // Ajusta as cores para garantir que correspondam ao número de palavras
  if (colors.length < words.length) {
    consoleElement.warn(
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
      const delayInterval = setTimeout(() => {
        letterCount = 0;
        wordIndex = (wordIndex + 1) % words.length; // Avança para a próxima palavra
        target.style.color = colors[wordIndex]; // Atualiza a cor do texto
        waiting = false;

        // Verifica se o loop está desativado e finaliza após exibir todas as palavras
        if (!loop && wordIndex === 0) {
          console.log('Finalizou a animação');
          clearInterval(typingInterval);
          clearInterval(delayInterval);
          if (showCursor && cursorInterval) clearInterval(cursorInterval);
          if (onComplete) onComplete(); // Chama o callback ao final da animação
        }
      }, delay); // Usa o parâmetro delay
    }
  }, typingSpeed);

  // Animação do cursor
  if (showCursor && consoleElement) {
    cursorInterval = setInterval(() => {
      consoleElement.className = visible
        ? "introduction__underscore body hidden"
        : "introduction__underscore body";
      visible = !visible;
    }, 400);
  } else if (consoleElement) {
    // Remove o cursor se showCursor for false
    consoleElement.remove();
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

  // Verifica se os elementos essenciais existem
  if (!content || !overlay || !centeredText || !hero || !heroImage) {
    console.error("Essential elements are missing. Aborting initialization.");
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    console.log("🚀 ~ document.addEventListener ~ thumbnail:", thumbnail)
    return;
  }
  window.scrollTo(0, 0); // Garante que o scroll está no topo da página

  // Block the content until the animation is complete
  content.classList.add("disabled");

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
    if (!hero.contains(heroVideo)) {
      hero.appendChild(heroVideo);
    }
    heroImage.style.opacity = "0";
  });

  heroVideo.addEventListener("error", () => {
    console.error("Error loading background video.");
    heroImage.style.opacity = "1";
  });

  // === Modal de Vídeo ===
  const thumbnail = document.querySelector(".video-thumbnail");
  const videoButton = document.querySelector(".video__control__button");
  const modal = document.querySelector(".video__modal");
  const iframe = document.querySelector(".video-frame");
  const closeBtn = document.querySelector(".video__modal__close");

  if (thumbnail && modal && iframe && closeBtn) {
    thumbnail.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal();
    });
    
    thumbnail.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });

    videoButton.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal();
    });

    closeBtn.addEventListener("click", () => {
      closeModal();
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }


  function openModal() {
    iframe.src = "https://www.youtube.com/embed/7ueYvVdbdBI??autoplay=1&rel=0"; 
    modal.showModal();
    closeBtn.focus();
  }
  function closeModal() {
    iframe.src = "";
    modal.close();
  }

  consoleText(
    ["Every great thing starts with a blank page"], // Texto
    "text", // ID do elemento onde o texto será exibido
    ["var(--text-color-1)"], // Cores do texto
    false, // Sem loop
    () => {
      // Ações ao final da animação
      setTimeout(() => {
        centeredText.style.opacity = "0"; // Inicia o fade-out do texto
      }, 500); // Metade do tempo do fade-out do overlay

      setTimeout(() => {
        overlay.style.opacity = "0"; // Inicia o fade-out do overlay
        overlay.addEventListener("transitionend", () => {
          content.ariaHidden = false; // Exibe o conteúdo
          content.classList.remove("disabled");
          overlay.remove(); // Remove o elemento após a transição
        });
      }, 1800); // Tempo total antes do fade-out do overlay
    },
    false,
    60
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
