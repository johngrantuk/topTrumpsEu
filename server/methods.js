Meteor.methods({

  RemoveGame: function(OwnerId){
    Games.remove({ownerId: OwnerId});
  },

  RemoveUser: function(UserId){
    Meteor.users.remove(UserId);
  },

  AddGameId: function(UserId, GameId){
    Meteor.users.update({ _id: UserId }, {$set : { 'profile.gameId': GameId }});
  }
});
