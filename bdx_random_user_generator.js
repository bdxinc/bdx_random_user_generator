(function() {

function generateUser(event) {
  if (event.target !== event.currentTarget && event.target.nodeName === "BUTTON") {
    console.log(event.target.name);
  }
  event.stopPropagation();
}

httpRequest.onreadystatechange = generateUser;

httpRequest.open('GET', 'https://randomuser.me/api', true);
httpRequest.send();

function alertContents() {
  if (httpRequest.readySate === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      alert(response.computedString)
    } else {
      alert('There was a problem with the request.');
    }
  }
}

var buttonsEl = document.getElementById("buttons");
buttonsEl.addEventListener("click", generateUser, true);

})();
