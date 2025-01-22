document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".introduction");
  const centeredText = document.querySelector(".introduction__text");

  const burgerMenu = document.querySelector(".burger-menu");
  const listSection = document.getElementById("list");

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


  // const handleBurgerMenuAction = () => {
  //   listSection.scrollIntoView({ behavior: "smooth" });
  // };

  // burgerMenu.addEventListener("click", handleBurgerMenuAction);
  // burgerMenu.addEventListener("keydown", (event) => {
  //   if (event.key === "Enter") {
  //     handleBurgerMenuAction();
  //   }
  // });
});
