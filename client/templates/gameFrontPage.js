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
  }

});
