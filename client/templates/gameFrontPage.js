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
    console.log("gameFrontPage, You are playerNo: " + playerNo);

    if(playerNo == this.playerTurn)
      return true;
    else
      return false;
  }

});

Template.gameFrontPage.events({
  'click #startGame': function(e) {

    e.preventDefault();


    Meteor.call('SetGameStarted', this._id, true);                              // Owner has started game so set to true.

  },
  
  'click #takeTurn': function(e) {

    e.preventDefault();

    console.log("Taking turn! " + this._id);

    Meteor.call('SetNextTurn', this.playerTurn, this._id);                              // Move to the next players turn.

  }


});
