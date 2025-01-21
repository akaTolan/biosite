document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".introduction");
  const centeredText = document.querySelector(".intro-text");

  const burgerMenu = document.querySelector(".burger-menu");
  const listSection = document.getElementById("listSection");

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


  burgerMenu.addEventListener("click", () => {
    // Faz o scroll suave até a seção de vídeo
    listSection.scrollIntoView({ behavior: "smooth" });
  });
});
