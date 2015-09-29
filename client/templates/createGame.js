Template.createGame.events({
  'submit form': function(e) {

    e.preventDefault();

    var user = {
      username: $(e.target).find('#name').val(),
      password: "test"
    }

    Accounts.createUser(user, function(error){

      var game = {                                              // Once user has been added create a game record.
        name: $(e.target).find('#gameName').val(),
        owner: user,
        ownerId: Meteor.userId(),                             // New user id is owner id.
        isStarted: false,
        playerTurn: 0
      };

      game._id = Games.insert(game);

      Meteor.call('AddPlayerNo', Meteor.userId(), 0);        // Add player number to user.
      Meteor.call('AddGameId', Meteor.userId(), game._id, user.username);            // User will be part of the game.

      Router.go('gameFrontPage', game);
    });
  }
});
