document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".intro-overlay");
  const centeredText = document.querySelector(".intro-text");

  const video = document.getElementById("myVideo");
  const playPauseButton = document.getElementById("playPauseButton");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const pauseButton = document.createElement("button"); // Cria o botão de pausa
  const pauseIcon = document.createElement("img");

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

  // Configura o botão de pausa
  pauseButton.classList.add("pause-btn");
  pauseIcon.src = "assets/pause_sign.png";
  pauseIcon.alt = "Pause";
  pauseButton.appendChild(pauseIcon);
  document.querySelector(".video-container").appendChild(pauseButton);

  // Botão play/pause no centro
  playPauseButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseIcon.src = "assets/pause_sign.png";
      playPauseButton.classList.add("hidden"); // Esconde o botão play
    } else {
      video.pause();
      playPauseIcon.src = "assets/play_sign.png";
      playPauseButton.classList.remove("hidden"); // Mostra o botão play
    }
  });

  // Botão pausa no canto
  pauseButton.addEventListener("click", () => {
    if (!video.paused) {
      video.pause();
      playPauseIcon.src = "assets/play_sign.png";
      playPauseButton.classList.remove("hidden"); // Mostra o botão play
    }
  });

  // Mostrar/ocultar os botões no hover
  video.addEventListener("play", () => {
    playPauseButton.classList.add("hidden"); // Esconde o botão play
  });

  video.addEventListener("pause", () => {
    playPauseButton.classList.remove("hidden"); // Mostra o botão play
  });
});
