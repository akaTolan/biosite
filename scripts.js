document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".introduction");
  const centeredText = document.querySelector(".introduction__text");

  // Faz o texto desaparecer primeiro
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

});

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o elemento Hero
  const hero = document.querySelector(".hero");

  // Cria o elemento <video>
  const video = document.createElement("video");
  video.classList.add("background-video");
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.src = "../assets/background.mp4"; // Caminho do vídeo

  // Adiciona o vídeo ao container Hero
  video.addEventListener("canplaythrough", () => {
    hero.appendChild(video); // Adiciona o vídeo ao Hero
    hero.style.backgroundImage = "none"; // Remove o background estático
  });

  // Exibe erro no console se houver falha ao carregar o vídeo
  video.addEventListener("error", () => {
    console.error("Erro ao carregar o vídeo de fundo.");
  });
});
