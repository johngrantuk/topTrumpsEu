Template.game.events({
  'submit form': function(e) {                                      // New player has clicked to join existing game.

    e.preventDefault();

    gameId = this._id;

    var user = {
      username: $(e.target).find('#name').val(),                    // Get user details from the form.
      password: "test"
    }

    Accounts.createUser(user, function(error){                      // Create a new user, this function also logs them in.

      var noPlayers = Meteor.users.find({"profile.gameId": this._id}).count();

      console.log("Number of players: " + noPlayers);

      Meteor.call('AddPlayerNo', Meteor.userId(), noPlayers);        // Add player number to user.
      Meteor.call('AddGameId', Meteor.userId(), gameId);            // User will be part of the game.
    });

    Router.go('gameFrontPage', this);

  }
});

Template.game.helpers({

  players: function() {
    players = Meteor.users.find({"profile.gameId": this._id});
    return players;
  }

})
