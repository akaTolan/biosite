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
 */
const consoleText = (words, id, colors = ['#000'], loop = false, onComplete = null) => {
  let letterCount = 0;
  let waiting = false;
  const target = document.getElementById(id);
  const con = document.getElementById('console'); // Cursor (_)
  let visible = true;

  target.style.color = colors[0];

  // Escreve o texto letra por letra
  const typingInterval = setInterval(() => {
    if (waiting) return;

    if (letterCount < words[0].length) {
      target.innerHTML = words[0].substring(0, letterCount + 1);
      letterCount++;
    } else {
      if (loop) {
        // Reinicia o texto se o loop for ativado
        waiting = true;
        setTimeout(() => {
          letterCount = 0;
          waiting = false;
        }, 1000);
      } else {
        // Finaliza a animação
        clearInterval(typingInterval);
        clearInterval(cursorInterval); // Para a animação do cursor
        con.className = 'introduction__underscore body hidden'; // Remove o cursor (_)
        if (onComplete) onComplete(); // Chama a função final, se existir
      }
    }
  }, 120);

  // Cursor piscando (_)
  const cursorInterval = setInterval(() => {
    con.className = visible
      ? 'introduction__underscore body hidden'
      : 'introduction__underscore body';
    visible = !visible;
  }, 400);
};

/**
 * Initializes the document once the DOM content is loaded.
 *
 * This function sets up the hero section with a background video or image depending on the device type,
 * and animates typing text in the introduction section. It also handles the transition from the introduction
 * overlay to the main content.
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
    console.error("Erro ao carregar o vídeo de fundo.");
  });

  // Chama o consoleText e adiciona as ações finais
  consoleText(
    ['Every great thing starts with a blank page'], // Texto
    'text',                                        // ID do elemento onde o texto será exibido
    ['var(--text-color-1)'],                       // Cores do texto
    false,                                         // Sem loop
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
    }
  );
});
