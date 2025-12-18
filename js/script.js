document.addEventListener("DOMContentLoaded", () => {

  console.log("AeridonTech site loaded");

  function toggleService(selectedCard) {
    const allCards = document.querySelectorAll(".service-card");

    allCards.forEach(card => {
      const info = card.querySelector(".service-info");

      if (card === selectedCard) {
        const isOpen = info.style.maxHeight && info.style.maxHeight !== "0px";

        if (isOpen) {
          // collapse selected
          info.style.maxHeight = "0px";
          info.style.opacity = "0";
          card.style.backgroundColor = "#ffffff";
          card.style.color = "#000000";
        } else {
          // expand selected
          info.style.maxHeight = info.scrollHeight + "px";
          info.style.opacity = "1";
          card.style.backgroundColor = "#073B4C";
          card.style.color = "#ffffff";
        }
      } else {
        // close all others
        info.style.maxHeight = "0px";
        info.style.opacity = "0";
        card.style.backgroundColor = "#ffffff";
        card.style.color = "#000000";
      }
    });
  }

  // Make function available to HTML onclick=""
  window.toggleService = toggleService;

});
