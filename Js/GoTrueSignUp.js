// Script uses auth0.js. See Remarks for details.


  // Initialize client
  var webAuth = new auth0.WebAuth({
    domain:       'https://lightminedust.netlify.app/.netlify/identity',
    clientID:     '{yourClientId}'
  });
  
  webAuth.signup({ 
    connection: 'CONNECTION', 
    email: 'EMAIL', 
    password: 'PASSWORD',
    username: "johndoe",
    given_name: "John",
    family_name: "Doe",
    name: "John Doe",
    nickname: "johnny",
    picture: "http://example.org/jdoe.png",
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) { 
    if (err) return alert('Something went wrong: ' + err.message); 
      return alert('success signup without login!') 
  });