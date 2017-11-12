(function() {

  function handleClick(event) {
    if (event.target !== event.currentTarget && event.target.nodeName === "BUTTON") {
      console.log(event.target.name);

      generateUser(event.target.name);
    }
    event.stopPropagation();
  }

  var buttonsEl = document.getElementById("buttons");
  buttonsEl.addEventListener("click", handleClick, true);

  function generateUser(callType) {
    switch(callType) {
      case "xhr":
        xhrRequest();
        break;
      case "fetch":
        fetchRequest();
        break;
      case "axios":
        axiosRequest();
        break;
      case "jQuery":
        jQueryRequest();
        break;
    }
  }


  function xhrRequest() {
    var httpRequest = new XMLHttpRequest();
    console.log(httpRequest);
    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = function() {
      try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          console.log(httpRequest.readyState);
          if (httpRequest.status === 200) {
            console.log(httpRequest.status);
            var response = JSON.parse(httpRequest.responseText);
            console.log(response.results[0]);

            displayUser(response.results[0]);

          } else {
            console.log('There was a problem with the request.');
          }
        }
      }
        catch( e ) {
          console.log('Caught Exception: ' + e.description);
      }
    };
    httpRequest.open('GET', 'https://randomuser.me/api');
    httpRequest.send();
  }

  function fetchRequest() {
    fetch('https://randomuser.me/api').then(function(response) {
      return response.json();
    }).then(function(myJSON) {
      console.log(myJSON.results[0]);
      displayUser(myJSON.results[0]);
    })
  }

  function axiosRequest() {
    axios.get('https://randomuser.me/api').then(function(response) {
      console.log(response.data.results[0]);
      displayUser(response.data.results[0]);
    });
  }

  function jQueryRequest() {
    $.get('https://randomuser.me/api', function(data) {
      console.log(data.results[0]);
      displayUser(data.results[0]);
    });
  }


  function displayUser(userInfo) {
    // work-in-progress
    document.getElementById('fullName').textContent = userInfo.name.first + " " + userInfo.name.last;
    document.getElementById('userName').textContent = userInfo.login.username;
    document.getElementById('nationality').textContent = userInfo.nat;
    document.getElementById('location').textContent = userInfo.location.city + ", " + userInfo.location.state;
    document.getElementById('gender').textContent = userInfo.gender;
    document.getElementById('age').textContent = age(userInfo.dob);

    // document.getElementById('').textContent = userInfo.;
  }


  function age(dob) {
    var past = new Date(dob.split(' ')[0].replace(/\-+/g, '/'));
    var diff_ms = Date.now() - past.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

})();
