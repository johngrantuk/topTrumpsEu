Meteor.methods({

  LoadCountriesApi: function(){                                                     // Loads countries and data from API.
    console.log("LoadCountriesApi:");

    Countries.remove({});                                                           // Clears the array.

    allCountries = Eqls.getCountryArray();                                          // Gets the countries.

    allCountries.forEach(function(country) {                                        // For each country add some info.

      console.log("Adding info for: " + country.name);
      var infoArray = [];

      // TopicId, VariableIndex, CategoryIndex, DataIndex, CountryValue
      infoArray.push(GetSomeInfo(9, 1, 4, 0, country.categoryValue));         // Personal financial situation
      infoArray.push(GetSomeInfo(9, 3, 0, 0, country.categoryValue));         // Can afford to keep home adequately warm?
      infoArray.push(GetSomeInfo(3, 0, 3, 0, country.categoryValue));
      infoArray.push(GetSomeInfo(8, 0, 0, 1, country.categoryValue));         // Employed (includes on leave)
      infoArray.push(GetSomeInfo(10, 0, 2, 1, country.categoryValue));        // Health
      infoArray.push(GetSomeInfo(16, 0, 1, 1, country.categoryValue));        // I am optimistic about the future
      //infoArray.push(GetSomeInfo(14, 0, 2, 1, country.categoryValue));        // How often felt cheerful and in good spirits last 2 weeks?
      //infoArray.push(GetSomeInfo(15, 4, 2, 1, country.categoryValue));        // Working hours fit with family/social commitments?

      Countries.insert({
        name: country.name,
        stats: infoArray
      });

    });

  },

  RemoveGame: function(OwnerId){
    Games.remove({ownerId: OwnerId});                                                 // Removes a game by owner id
  },

  RemoveUser: function(UserId){                                                       // Removes user by their id.
    Meteor.users.remove(UserId);
  },

  AddGameId: function(UserId, GameId, PlayerName){
    Meteor.users.update({ _id: UserId }, {$set : { 'profile.gameId': GameId }});      // Update a user with id of game they are in.
    Games.update({ _id: GameId }, { "$push" : {'log': {'entry': PlayerName + " joined."}}});
  },

  AddPlayerNo: function(UserId, PlayerNo){
    Meteor.users.update({ _id: UserId }, {$set : { 'profile.playerNo': PlayerNo }});  // Update a user with the player number they are in game.
  },

  AddCountryToPlayer: function(UserId, Country){                                      // Adds new country to the User.profile.countries[]
    Meteor.users.update(
      {_id: UserId},
      {
        "$push" : {
          "profile.countries": Country
        }
      }
    );
  },

  SetGameStarted: function(GameId, isStarted){                                           // Update the game isStarted field and log entry.
    Games.update({ _id: GameId }, { $set : { 'isStarted': isStarted }, "$push" : {'log': {'entry': 'Game is started.'}}});
  },

  SetNextTurn: function(CurrentPlayer, GameId, SelectedStat){

    var currentPlayer = Meteor.users.findOne({"profile.gameId": GameId, "profile.playerNo": CurrentPlayer}).username;

    Games.update({ _id: GameId }, {"$push" : {'log': {'entry': currentPlayer + " selected " + SelectedStat}}});

    AnalyseRound(GameId, SelectedStat);

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

function AnalyseRound(GameId, SelectedStat){

  var players = Meteor.users.find({"profile.gameId": GameId}).fetch();                              // Fetch all the players in current game.
  var playerResults = [];
  var roundCountries = [];

  for(i = 0;i < players.length;i++){                                                                // Iterate each player and store their ID, first country and value for selected stat.

    value = getStatValue(SelectedStat, players[i].profile.countries[0].stats);                      // Find the selected stat value for players first country.

    Games.update({ _id: GameId },{ "$push" : {'log': {'entry': players[i].username + ", " + players[i].profile.countries[0].name + ", " + SelectedStat + ": " + value}}});

    playerResults.push({id: players[i]._id, username: players[i].username, country: players[i].profile.countries[0], value: value});// Store player info for comparrison later.
    roundCountries.push(players[i].profile.countries[0]);                                           // Add player country s
  }

  var highest = 0;                                                                                  // This will store the index of the player with highest stat value.

  for(i = 0;i < playerResults.length;i++){                                                          // Iterate each player.

    if (playerResults[i].value > playerResults[highest].value){                                     // Check if current player stat value is higher than the current highest.
      highest = i;                                                                                  // If yes then store the index as new highest.
    }

    Meteor.users.update({"_id" : playerResults[i].id,},                                       // Remove player i country - winner will have theirs readded.
      {
        "$pull" : { "profile.countries" : { "_id" : playerResults[i].country._id } }
      }
    );

  }

  Games.update({ _id: GameId },{ "$push" : {'log': {'entry': "Round winner was..." + playerResults[highest].username + "!"}}});

  roundCountries.forEach(function(country) {                                                    // add countries to player highest
    Meteor.users.update(
      { "_id" : playerResults[highest].id  },
      { "$addToSet" : { "profile.countries" :  country}  }
    );
  });

}

function getStatValue(Stat, CountryStatsArray){                                                       // Gets value for element with name === Stat

    for (var x = 0, len = CountryStatsArray.length; x < len; x++) {                                   // Iterate each element in array.
      if(CountryStatsArray[x].name === Stat){                                                         // Check if name matches
        return CountryStatsArray[x].value;                                                            // If yes return value
      }
    }

    return 0;                                                                                         // If none match return value of 0.
}
