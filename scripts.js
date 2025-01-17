document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".intro-overlay");
  const centeredText = document.querySelector(".intro-text");

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
