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

  AddCountryToPlayer: function(UserId, Country){
    Meteor.users.update(
      {_id: UserId},
      {
        "$push" : {
          "profile.countries": Country
        }
      }
    );
  },

  SetGameStarted: function(GameId, isStarted){
    Games.update({ _id: GameId }, { $set : { 'isStarted': isStarted }, "$push" : {'log': {'entry': 'Game is started.'}}});
  },

  SetNextTurn: function(CurrentPlayer, GameId, SelectedStat){

    AnalyseRound(GameId, SelectedStat);

    var currentPlayer = Meteor.users.findOne({"profile.gameId": GameId, "profile.playerNo": CurrentPlayer}).username;

    var nextPlayer =  Meteor.users.findOne({"profile.gameId": GameId, "profile.playerNo": { $gt: CurrentPlayer }}); // Find any existing players that playerNo > curent

    if(nextPlayer){                                                                                           // If next player exists then update game playerNo
      Games.update({ _id: GameId }, {$set : { 'playerTurn': nextPlayer.profile.playerNo }, "$push" : {'log': {'entry': currentPlayer + " selected " + SelectedStat}}});
    }
    else{                                                                                                     // No higher players so go back to start.
      nextPlayer =  Meteor.users.findOne({"profile.gameId": GameId});                                         // Find the lowest playerNo
      Games.update({ _id: GameId }, {$set : { 'playerTurn': nextPlayer.profile.playerNo }, "$push" : {'log': {'entry': currentPlayer + " selected " + SelectedStat}}});                  // Update the game playerNo
    }
  }
});

function AnalyseRound(GameId, SelectedStat){

  var players = Meteor.users.find({"profile.gameId": GameId}).fetch();
  var playerResults = [];

  console.log("No Players: " + players.length);

  for(i = 0;i < players.length;i++){

    value = getStatValue(SelectedStat, players[i].profile.countries[0].stats);

    console.log(players[i].username + " stat value: " + value);

    playerResults.push({id: players[i]._id, country: players[i].profile.countries[0], value: value});
  }

  console.log(playerResults);
  highest = 0;

  for(i = 0;i < playerResults.length;i++){

    if (playerResults[i].value > playerResults[highest].value)
      highest = i;
  }

  console.log("Highest: " + playerResults[highest].id);


}

function getStatValue(Stat, CountryStats){

    for (var x = 0, len = CountryStats.length; x < len; x++) {
      if(CountryStats[x].name === Stat){
        return CountryStats[x].value;
      }
    }

    return 0;
}
