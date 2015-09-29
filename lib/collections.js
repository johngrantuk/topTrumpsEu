Games = new Mongo.Collection('games');
TestCountries = new Mongo.Collection('testCountries');
Countries = new Mongo.Collection('countries');

securityRules = {
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return true;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return true;
  },
  remove: function(userID, doc) {
    //only allow deleting if you are owner
    return true;
  }
}

Games.allow(securityRules);
