Meteor.methods({

  RemoveGame: function(OwnerId){
    Games.remove({ownerId: OwnerId});
  },

  RemoveUser: function(UserId){
    Meteor.users.remove(UserId);
  },

  AddGameId: function(UserId, GameId){
    Meteor.users.update({ _id: UserId }, {$set : { 'profile.gameId': GameId }});
  },

  AddPlayerNo: function(UserId, PlayerNo){
    Meteor.users.update({ _id: UserId }, {$set : { 'profile.playerNo': PlayerNo }});
  },

  SetGameStarted: function(GameId, isStarted){
    Games.update({ _id: GameId }, {$set : { 'isStarted': isStarted }});
  },

  SetNextTurn: function(CurrentPlayer, GameId){
    var nextPlayer =  Meteor.users.findOne({"profile.gameId": GameId, "profile.playerNo": { $gt: CurrentPlayer }}); // Find any existing players that playerNo > curent

    if(nextPlayer){                                                                                           // If next player exists then update game playerNo
      Games.update({ _id: GameId }, {$set : { 'playerTurn': nextPlayer.profile.playerNo }});
    }
    else{                                                                                                     // No higher players so go back to start.
      nextPlayer =  Meteor.users.findOne({"profile.gameId": GameId});                                         // Find the lowest playerNo
      Games.update({ _id: GameId }, {$set : { 'playerTurn': nextPlayer.profile.playerNo }});                  // Update the game playerNo
    }
  }
});
