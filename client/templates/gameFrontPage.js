Template.gameFrontPage.helpers({
  isOwner: function() {

    if(this.ownerId == Meteor.userId())
      return true;
    else {
      return false;
    }

  },

  players: function() {
    players = Meteor.users.find({"profile.gameId": this._id});
    return players;
  },

  readyToPlay: function(){

    if(Meteor.users.find({"profile.gameId": this._id}).count() > 1){
      return true;
    }

    return false;
  },

  isGameStarted: function(){
    var game = Games.findOne(this._id);

    return game.isStarted;
  },

  isYourTurn: function(){
    var playerNo = Meteor.user().profile.playerNo;
    //console.log("gameFrontPage, You are playerNo: " + playerNo);

    if(playerNo == this.playerTurn){
      Session.set("yourTurn", true);
      return true;
    }
    else{
      Session.set("yourTurn", false);
      return false;
    }
  },

  playersTurn: function(){
    var player = Meteor.users.findOne({"profile.playerNo": this.playerTurn});
    return player.username;
  },

  playerCountry: function(){
    return Meteor.user().profile.countries[0];
  },

  countryCount: function(){
    var countryCount =  Meteor.users.findOne(Meteor.userId()).profile.countries.length;
    var playerCount = Meteor.users.find({"profile.gameId": this._id}).count();

    console.log(countryCount);

    if(countryCount === 0){                                                                 // Check if current user has lost all their countries.
      Router.go('gameLostPage');                                                     // Redirect to loosing page.
    }
    else if(countryCount === Countries.find().count()){                                 // Check if current user has got all the countries.

      Router.go('gameWonPage');                                                     // Redirect to winner page.
    }

    console.log("Player Count: " + playerCount);
    if(playerCount < 2){

      //if(Meteor.users.findOne(Meteor.userId()).profile.gameId === this._id)
        Router.go('gameWonPage');
      //else {
    //    Router.go('gameLostPage');
      //}

    }

    return countryCount;
  }

});

Template.gameFrontPage.events({
  'click #startGame': function(e) {

    e.preventDefault();
    AllocateCountries(this._id);                                                          // Allocate users fair share of countries.

    Meteor.call('SetGameStarted', this._id, true);                                      // Owner has started game so set to true.
  }

});

function AllocateCountries(GameId){
  console.log("AllocateCountries() " + GameId);

  var gamePlayers = Meteor.users.find({"profile.gameId": GameId}).fetch();            // Finds all players in the current game.

  //var countries = TestCountries.find();                                               // Finds all countries in test collection.
  var countries = Countries.find();

  var playerIndex = 0;

  countries.forEach(function(country) {                                               // Iterate each country.

    Meteor.call('AddCountryToPlayer', gamePlayers[playerIndex]._id, country);         // Adds country to player.profile.countries[]

    playerIndex++;                                                                    // Moves to next player.
    if(playerIndex >= gamePlayers.length)                                             // If been through each player move back to start.
      playerIndex = 0;

  });
}
