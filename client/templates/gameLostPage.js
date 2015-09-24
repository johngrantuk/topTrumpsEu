Template.gameLostPage.helpers({

  playerName: function(){
    return Meteor.users.findOne(Meteor.userId()).username;
  }

});
