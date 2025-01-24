document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".introduction");
  const centeredText = document.querySelector(".introduction__text");
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".backround-image");

  const isMobileDevice = () =>
    /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

  // Introduction animation
  setTimeout(() => {
    centeredText.style.opacity = "0"; // Inicia o fade-out do texto
  }, 1600); // Metade do tempo do fade-out do overlay

  // Faz o overlay desaparecer depois
  setTimeout(() => {
    overlay.style.opacity = "0"; // Inicia o fade-out do overlay
    overlay.addEventListener("transitionend", () => {
      overlay.remove(); // Remove o elemento após a transição
    });
  }, 2800); // Tempo total antes do fade-out do overlay

  // Cria o elemento <video>
  const heroVideo = document.createElement("video");
  heroVideo.classList.add("background-video");
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
});
