(function() {

  // function generateUser(event) {
  //   if (event.target !== event.currentTarget && event.target.nodeName === "BUTTON") {
  //     console.log(event.target.name);
  //   }
  //   event.stopPropagation();
  // }



  var httpRequest;
  var buttonsEl = document.getElementById("xhr");
  buttonsEl.addEventListener("click", makeRequest, true);

  function makeRequest() {
    httpRequest = new XMLHttpRequest();
    console.log(httpRequest);
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'https://randomuser.me/api');
    httpRequest.send();
  }


  function alertContents() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log(httpRequest.readyState);
        if (httpRequest.status === 200) {
          console.log(httpRequest.status);
          var response = JSON.parse(httpRequest.responseText);
          alert(response.computedString)
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
      catch( e ) {
        alert('Caught Exception: ' + e.description);
    }
  }
})();
