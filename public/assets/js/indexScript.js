function onSuccess(googleUser) {
  console.log('Logged in as: ' +
    googleUser.getBasicProfile().getName()
  );
  
  var user = googleUser.getBasicProfile().getId();
  setUserData(user);
  sessionStorage.setItem("user", JSON.stringify({id:user}));
}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log(
      'User signed out.');
      sessionStorage.clear();
      $("#randomPage").attr("action", "/random");
      $("#createPage").attr("action", "/create");
  });
  
}

function setUserData(user){
  $("#randomPage").attr("action", "/random/" + user);
  $("#createPage").attr("action", "/create/" + user);
}



