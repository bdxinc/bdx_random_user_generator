function generateUser(event) {
  if (event.target !== event.currentTarget && event.target.nodeName === "BUTTON") {
    console.log(event.target.name);
  }
  event.stopPropagation();
}

var buttonsEl = document.getElementById("buttons");
buttonsEl.addEventListener("click", generateUser, true);
